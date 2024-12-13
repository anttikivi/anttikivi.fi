/** @type {import("lightningcss").Visitor} */
const visitor = {
  Declaration(property) {
    if (
      property.property === "custom" &&
      property.value.name.startsWith("--color")
    ) {
      let valueFunction = property.value.value[0];

      if (
        valueFunction.type === "function" &&
        valueFunction.value.name === "oklch"
      ) {
        let lightness = /** @type {{type: "number", value: number}} */ (
          /** @type {{ type: "token", value: import("lightningcss").Token}} */ (
            valueFunction.value.arguments[0]
          ).value
        ).value;
        let chroma = /** @type {{type: "number", value: number}} */ (
          /** @type {{ type: "token", value: import("lightningcss").Token}} */ (
            valueFunction.value.arguments[2]
          ).value
        ).value;
        let hue = /** @type {{type: "number", value: number}} */ (
          /** @type {{ type: "token", value: import("lightningcss").Token}} */ (
            valueFunction.value.arguments[4]
          ).value
        ).value;

        let alpha = 1;

        if (valueFunction.value.arguments.length > 5) {
          alpha = /** @type {{type: "number", value: number}} */ (
            /** @type {{ type: "token", value: import("lightningcss").Token}} */ (
              valueFunction.value.arguments[6]
            ).value
          ).value;
        }

        return {
          property: "custom",
          value: {
            name: property.value.name,
            value: [
              {
                type: "color",
                value: {
                  type: "oklch",
                  l: lightness,
                  c: chroma,
                  h: hue,
                  alpha: alpha,
                },
              },
            ],
          },
        };
      }
    }
  },
};

export default visitor;
