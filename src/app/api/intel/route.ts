import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

/** GET /api/intel — Fetch all intel records from MongoDB */
export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection("intel_reports")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const data = docs.map(({ _id, ...rest }) => rest);

    return NextResponse.json(
      { success: true, count: data.length, data },
      { status: 200 }
    );
  } catch (err) {
    const msg = String(err);
    const isIPBlock =
      msg.includes("Could not connect") ||
      msg.includes("ECONNREFUSED") ||
      msg.includes("getaddrinfo") ||
      msg.includes("timed out") ||
      msg.includes("not defined");

    console.error("[GET /api/intel]", msg);

    return NextResponse.json(
      {
        success: false,
        data: [],
        error: isIPBlock
          ? "MongoDB Atlas connection failed. Make sure MONGODB_URI is set in .env.local and your IP is whitelisted in Atlas Network Access."
          : msg,
      },
      { status: 500 }
    );
  }
}

/** POST /api/intel — Insert one or many intel records */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const records = Array.isArray(body) ? body : [body];

    if (!records.length) {
      return NextResponse.json({ success: false, error: "No records." }, { status: 400 });
    }

    const stamped = records.map((r) => ({
      ...r,
      createdAt: r.createdAt ?? new Date().toISOString(),
    }));

    const db = await getDb();
    const result = await db.collection("intel_reports").insertMany(stamped, { ordered: false });

    return NextResponse.json({ success: true, inserted: result.insertedCount }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/intel]", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

/** DELETE /api/intel — Clear all records */
export async function DELETE() {
  try {
    const db = await getDb();
    const result = await db.collection("intel_reports").deleteMany({});
    return NextResponse.json({ success: true, deleted: result.deletedCount }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
