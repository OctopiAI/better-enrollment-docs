import {
  Braces,
  Calendar,
  Database,
  Hash,
  Key,
  Link as LinkIcon,
  ToggleRight,
  Type
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface DatabaseTableField {
  name: string;
  type: string;
  description: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isOptional?: boolean;
  isUnique?: boolean;
  references?: {
    model: string;
    field: string;
  };
}

function TypeIcon({ type }: { type: string }) {
  const className = "size-3 shrink-0";

  switch (type.toLowerCase()) {
    case "string":
      return <Type className={cn(className, "text-emerald-600")} />;
    case "boolean":
      return <ToggleRight className={cn(className, "text-violet-600 dark:text-violet-500")} />;
    case "date":
      return <Calendar className={cn(className, "text-sky-600")} />;
    case "number":
      return <Hash className={cn(className, "text-orange-500 dark:text-orange-600")} />;
    default:
      return <Braces className={cn(className, "text-foreground/40")} />;
  }
}

const gridCols =
  "grid grid-cols-[minmax(160px,1.2fr)_minmax(100px,0.8fr)_minmax(56px,0.5fr)_minmax(150px,2fr)] min-w-[600px]";

export function DatabaseTable({ name, fields }: { name: string; fields: DatabaseTableField[] }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <Database className="text-foreground/60 size-3.5" />
        <span className="text-foreground/60 font-mono text-[11px] font-medium tracking-wider uppercase">
          Table
        </span>
        <span className="text-foreground/80 font-mono text-[13px] font-medium">{name}</span>
      </div>

      <div className="overflow-x-auto">
        <div className={cn(gridCols, "bg-foreground/2 border-b")}>
          {["Field", "Type", "Key", "Description"].map((label) => (
            <div
              key={label}
              className="text-foreground/60 px-4 py-1 font-mono text-[11px] font-medium tracking-wider uppercase"
            >
              {label}
            </div>
          ))}
        </div>

        {fields.map((field) => (
          <div
            key={field.name}
            className={cn(
              gridCols,
              "border-foreground/10 hover:bg-foreground/2 items-center border-b border-dashed transition-colors last:border-b-0"
            )}
          >
            <div className="text-foreground/80 px-4 py-2 font-mono text-[13px] break-all">
              {field.name}
              {field.isOptional && (
                <span
                  title="Optional"
                  aria-label="Optional"
                  className="text-foreground/40 text-[11px] font-medium select-none"
                >
                  {" ?"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2">
              <TypeIcon type={field.type} />
              <span className="text-foreground/80 font-mono text-[13px]">{field.type}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              {field.isPrimaryKey && (
                <span className="inline-flex items-center gap-1 font-mono text-[13px] text-amber-600 uppercase dark:text-amber-500">
                  <Key className="size-2.5" />
                  PK
                </span>
              )}
              {field.isForeignKey && (
                <span
                  title={
                    field.references
                      ? `References ${field.references.model}.${field.references.field}`
                      : undefined
                  }
                  className="inline-flex items-center gap-1 font-mono text-[13px] text-blue-600 uppercase dark:text-blue-400"
                >
                  <LinkIcon className="size-2.5" />
                  FK
                </span>
              )}
              {field.isUnique && (
                <span
                  title="Unique"
                  className="font-mono text-[13px] text-emerald-600 uppercase dark:text-emerald-500"
                >
                  UQ
                </span>
              )}
              {!field.isPrimaryKey && !field.isForeignKey && !field.isUnique && (
                <span className="text-foreground/20 uppercase">-</span>
              )}
            </div>
            <div className="text-foreground/70 px-4 py-2 text-[13px] leading-relaxed">
              {field.description}
              {field.isForeignKey && field.references && (
                <span className="text-foreground/50">
                  {" "}
                  References{" "}
                  <span className="font-mono text-[12px]">
                    {field.references.model}.{field.references.field}
                  </span>
                  .
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
