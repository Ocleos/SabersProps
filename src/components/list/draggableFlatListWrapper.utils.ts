export type RowLayout = { height: number; y: number };

// Determines where a dragged row should land among its siblings, purely from each row's static
// (pre-drag) layout plus the finger's accumulated vertical translation — no live "make room"
// shifting of other rows, matching this fallback's reduced scope (see FOLDERS_FEATURE.md Phase 6).
// `layouts` is index-aligned with the list's current `data` order; a missing entry (row not yet
// laid out) is skipped rather than treated as a match.
export const computeDropIndex = (
  draggedIndex: number,
  translationY: number,
  layouts: (RowLayout | undefined)[],
): number => {
  const draggedLayout = layouts[draggedIndex];
  if (!draggedLayout) {
    return draggedIndex;
  }

  const draggedCenterY = draggedLayout.y + draggedLayout.height / 2 + translationY;

  return layouts.reduce((targetIndex, layout, index) => {
    if (index === draggedIndex || !layout) {
      return targetIndex;
    }
    return layout.y + layout.height / 2 < draggedCenterY ? targetIndex + 1 : targetIndex;
  }, 0);
};

export const moveItem = <T>(items: T[], fromIndex: number, toIndex: number): T[] => {
  if (fromIndex === toIndex) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};
