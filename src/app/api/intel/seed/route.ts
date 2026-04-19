import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { intelDataset } from "@/lib/intelData";

/**
 * POST /api/intel/seed
 * Seeds the MongoDB collection with the built-in 25-point dataset.
 * Safe to call multiple times — skips duplicates by ID.
 */
export async function POST() {
  try {
    const db = await getDb();
    const col = db.collection("intel_reports");

    let inserted = 0;
    let skipped = 0;

    for (const record of intelDataset) {
      const exists = await col.findOne({ id: record.id });
      if (exists) {
        skipped++;
        continue;
      }
      await col.insertOne({
        ...record,
        createdAt: new Date().toISOString(),
        source_type: "SEED",
      });
      inserted++;
    }

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${inserted} records. Skipped ${skipped} duplicates.`,
        inserted,
        skipped,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/intel/seed]", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

/** GET /api/intel/seed — Returns current collection count */
export async function GET() {
  try {
    const db = await getDb();
    const count = await db.collection("intel_reports").countDocuments();
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
