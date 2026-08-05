// Better Enrollment mark, drawn in Better Auth's visual language: rectilinear
// shapes on a 100-unit grid. A bar sliding into an open doorway — an
// invitation being redeemed.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      className={className ?? "size-5"}
      aria-hidden
    >
      <path fill="currentColor" d="M0 100h200v100H0zM200 0h200v300H200V200h100V100H200z" />
    </svg>
  );
}

/** Same mark as a raw path, for contexts without React (OG images, favicon). */
export const logoMarkPath = "M0 100h200v100H0zM200 0h200v300H200V200h100V100H200z";
