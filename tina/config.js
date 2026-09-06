import React from "react";
import { defineConfig } from "tinacms";

// 🚀 THE ULTIMATE CLOUD STRIP FIX: Forcing this flag inline at the absolute global runtime wrapper tells Tina to compile 100% offline on Vercel!
if (typeof window === "undefined" || !process.env.TINA_PUBLIC_IS_LOCAL) {
  process.env.TINA_PUBLIC_IS_LOCAL = "true";
}

export default defineConfig({
  branch: "main",
  clientId: "00000000-0000-0000-0000-000000000000",
  token: "0000000000000000000000000000000000000000",
  
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  
  ui: {
    brand: {
      logo: "/logo.png"
    }
  },

  schema: {
    collections: [
      {
        name: "products",
        label: "Products",
        path: "src/content/products",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { 
            type: "string", 
            name: "category", 
            label: "Category",
            list: true,
            ui: {
              component: ({ input, field }) => {
                const options = field.options || [];
                return (
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#374151" }}>
                      {field.label}
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", background: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                      {options.map((option) => {
                        const val = typeof option === 'string' ? option : option.value;
                        const lbl = typeof option === 'string' ? option : option.label;
                        const isChecked = (input.value || []).includes(val);
                        return (
                          <label key={val} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#1f2937", fontWeight: "500", userSelect: "none" }}>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "18px", height: "18px" }}>
                              <input
                                type="checkbox"
                                value={val}
                                checked={isChecked}
                                style={{ 
                                  appearance: "none", WebkitAppearance: "none", width: "18px", height: "18px", cursor: "pointer", borderRadius: "4px",
                                  backgroundColor: isChecked ? "#0A3D33" : "#ffffff", border: isChecked ? "2px solid #0A3D33" : "2px solid #d1d5db", transition: "all 0.1s ease", margin: 0, display: "block"
                                }}
                                onChange={(e) => {
                                  const newValue = [...(input.value || [])];
                                  if (e.target.checked) { newValue.push(val); } 
                                  else { const index = newValue.indexOf(val); if (index > -1) newValue.splice(index, 1); }
                                  input.onChange(newValue);
                                }}
                              />
                              {isChecked && (
                                <span style={{ position: "absolute", width: "4px", height: "8px", border: "solid white", borderWidth: "0 2px 2px 0", transform: "rotate(45deg) translate(0px, -1px)", display: "block", zIndex: 1 }} />
                              )}
                            </span>
                            {lbl}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            },
            options: ["Tech & Lifestyle", "Office Stationery", "Hampers", "Apparel", "Eco-Friendly", "Leather Goods", "Custom Decor"]
          },
          { type: "image", name: "image", label: "Image" },
          { type: "number", name: "price", label: "Price" },
          { type: "number", name: "moq", label: "MOQ" },
          { type: "string", name: "colors", label: "Colors", list: true, options: ["black", "white", "blue", "red", "gray", "tan", "green"] }
        ]
      }
    ]
  }
});
