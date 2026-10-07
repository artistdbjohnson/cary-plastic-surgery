import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { getPage } from "@/lib/content";

const page = getPage("home")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function HomePage() {
  return <HomeView />;
}
