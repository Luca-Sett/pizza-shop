import { defineField, defineType } from "sanity";

export const pizza = defineType({
  name: "pizza",
  title: "Pizzas",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "reference", to: { type: "ingredient" } }],
    }),
  ],
});

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
  ],
});

export const ingredients = defineType({
  name: "ingredient",
  title: "Ingredients",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
  ],
});

export const pizzaSizes = defineType({
  name: "pizzaSize",
  title: "Pizza Sizes",
  type: "document",
  fields: [
    defineField({
      name: "size",
      title: "Size",
      type: "number",
    }),
  ],
});
