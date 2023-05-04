import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { pizza, pizzaSizes, category, ingredients } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  title: "Luca's Pizzeria",
  basePath: "/admin",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: { types: [pizza, pizzaSizes, category, ingredients] },
});
