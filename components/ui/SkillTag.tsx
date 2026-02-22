interface SkillTagProps {
  name: string;
  small?: boolean;
}

export default function SkillTag({ name, small }: SkillTagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: small ? "0.25rem 0.65rem" : "0.45rem 1rem",
        background: "var(--tag-bg)",
        color: "var(--tag-text)",
        borderRadius: "100px",
        fontSize: small ? "0.7rem" : "0.8rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}
