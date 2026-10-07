import Link from "next/link";
import { Tx } from "@/components/tx";

export default function NotFound() {
  return (
    <div className="shell section-pad">
      <h1 className="text-4xl font-medium">
        <Tx text="Search Results" />
      </h1>
      <p className="mt-4">
        <Link className="prose-link" href="/">
          <Tx text="Home" />
        </Link>
      </p>
    </div>
  );
}
