import React from "react";
import { defineConfig } from "tinacms";

const isLocal = process.env.NODE_ENV === "development";

export default defineConfig({
  branch: isLocal ? undefined : (process.env.NEXT_PUBLIC_TINA_BRANCH || "main"),
  clientId: isLocal ? undefined : process.env.TINA_CLIENT_ID || null,
  token: isLocal ? undefined : process.env.TINA_TOKEN || null,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },

//const isProduction = process.env.NODE_ENV === "production";

//export default defineConfig({
  //branch: "main",
  //clientId: process.env.TINA_CLIENT_ID || null,
  //token: process.env.TINA_TOKEN || null,

 ui: {
    brand: {
      /* 💡 By passing a React component into Title, Tina deletes the llama asset and uses your custom brand layout row instead */
      Title: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0" }}>
          <img 
            src="/logo.png" 
            alt="Venture Solutions Logo" 
            style={{ height: "32px", width: "auto", objectFit: "contain", display: "block" }} 
            onError={(e) => {
              // Fail-safe backup routing path
              e.currentTarget.src = "/public/logo.png";
            }}
          />
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#111827", letterSpacing: "-0.5px", fontFamily: "system-ui, sans-serif" }}>
            Venture<span style={{ color: "#0A3D33" }}>Solutions</span>
          </span>
        </div>
      )
    }
  },

  //isCloud: isProduction,
  //local: !isProduction,

  schema: {
    collections: [
      {
        name: "product",
        label: "Corporate Products",
        path: "src/content/products",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Product Name", isTitle: true, required: true },
          { 
            type: "string", 
            name: "category", 
            label: "Categories",
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
            options: ["Tech & Lifestyle", "Office Stationery", "Diary", "Drinkware", "Eco-Friendly", "Leather Goods", "Keychains", "Gift Sets"]
          },
          { type: "image", name: "image", label: "Display Image" },
          { type: "number", name: "price", label: "Base Price (₹)" },
          { type: "number", name: "moq", label: "Minimum Order Quantity (MOQ)" },
          { type: "rich-text", name: "body", label: "Product Description", isBody: true },
          // 💡 COLOR CHECKLIST: Declared only once at the bottom
          {
             type: "string",
            name: "colors",
            label: "Available Colors",
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
                        const isChecked = (input.value || []).includes(option.value);
                        return (
                          <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#1f2937", fontWeight: "500", userSelect: "none" }}>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "18px", height: "18px" }}>
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={isChecked}
                                style={{ 
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  width: "18px", 
                                  height: "18px", 
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  backgroundColor: isChecked ? "#4338ca" : "#ffffff",
                                  border: isChecked ? "2px solid #4338ca" : "2px solid #d1d5db",
                                  transition: "all 0.1s ease",
                                  margin: 0,
                                  display: "block"
                                }}
                                onChange={(e) => {
                                  const newValue = [...(input.value || [])];
                                  if (e.target.checked) {
                                    newValue.push(option.value);
                                  } else {
                                    const index = newValue.indexOf(option.value);
                                    if (index > -1) newValue.splice(index, 1);
                                  }
                                  input.onChange(newValue);
                                }}
                              />
                              {/* 💡 FIXED: The checkmark span sits OUTSIDE the input tag attributes list! */}
                              {isChecked && (
                                <span style={{
                                  position: "absolute",
                                  width: "4px",
                                  height: "8px",
                                  border: "solid white",
                                  borderWidth: "0 2px 2px 0",
                                  transform: "rotate(45deg) translate(0px, -1px)",
                                  display: "block",
                                  zIndex: 1
                                }} />
                              )}
                            </span>
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            },
            options: [
              { value: "black", label: "Black" },
              { value: "blue", label: "Blue" },
              { value: "brown", label: "Brown" },
              { value: "tan", label: "Tan" },
              { value: "grey", label: "Grey" },
              { value: "red", label: "Red" },
              { value: "white", label: "White" },
              { value: "beige", label: "Beige" },
              { value: "green", label: "Green" }
            ]
          }
        ],
      },
    ],
  },
});
