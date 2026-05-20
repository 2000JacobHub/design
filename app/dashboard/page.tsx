"use client";

import { DashboardBackdrop, PanelHeader } from "@/components/dashboard/primitives";
import Header from "@/components/dashboard/primitives/Header";
import { BIG_AREAS } from "@/components/dashboard/registry";
import { useDashboardLayout } from "@/components/dashboard/useDashboardLayout";
import { DashboardSlot } from "@/components/dashboard/DashboardSlot";
import { LibraryPanel } from "@/components/dashboard/LibraryPanel";
import { FloatingToggle } from "@/components/dashboard/FloatingToggle";

export default function Dashboard() {
  const dash = useDashboardLayout();

  // Props shared by every slot — keeps the JSX below readable.
  const slotProps = {
    editing: dash.editing,
    dragType: dash.dragType,
    overSlot: dash.overSlot,
    onStartDrag: dash.startDrag,
    onEndDrag: dash.endDrag,
    onDragOver: dash.onSlotDragOver,
    onDragLeave: dash.onSlotDragLeave,
    onDrop: dash.onSlotDrop,
    onRemove: dash.removeSlot,
  };

  return (
    <div className="flex min-h-screen">
      <main className="relative flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 lg:p-5 dashboard-bg">
        <DashboardBackdrop />

        <Header />

        {dash.loaded && (
          <>
            <section
              aria-label="核心指标"
              className="relative z-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 lg:mb-5"
            >
              {dash.layout.small.map((id, i) => (
                <DashboardSlot key={`small-${i}`} section="small" index={i} id={id} {...slotProps} />
              ))}
            </section>

            <section className="relative z-2 dashboard-main-grid">
              {dash.layout.big.map((id, i) => (
                <DashboardSlot key={`big-${i}`} section="big" index={i} id={id} area={BIG_AREAS[i]} {...slotProps} />
              ))}

              <article
                className="cosmic-panel flex flex-col gap-3 p-4 lg:p-5 min-h-0"
                style={{ gridArea: "plan" }}
              >
                <PanelHeader title="AI 推荐计划" meta="由 AI 基于数据与目标推荐" />
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
                >
                  {dash.layout.mid.map((id, i) => (
                    <DashboardSlot key={`mid-${i}`} section="mid" index={i} id={id} {...slotProps} editing={dash.editing}/>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}
      </main>

      <LibraryPanel
        open={dash.editing}
        layout={dash.layout}
        onReset={dash.resetLayout}
        onDragStart={dash.startDrag}
        onDragEnd={dash.endDrag}
      />

      <FloatingToggle editing={dash.editing} onToggle={dash.toggleEditing} />
    </div>
  );
}
