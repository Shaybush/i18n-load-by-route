import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

export default function I18nDebug() {
  const { i18n: i18nInstance } = useTranslation();
  const [resources, setResources] = useState<any>({});
  // Set to true by default to make it visible initially
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateResources = () => {
      setResources(i18nInstance.services.resourceStore.data);
    };

    // Update initially
    updateResources();

    // Listen for changes
    i18nInstance.on("loaded", updateResources);
    i18nInstance.on("languageChanged", updateResources);

    return () => {
      i18nInstance.off("loaded", updateResources);
      i18nInstance.off("languageChanged", updateResources);
    };
  }, [i18nInstance]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        🐛
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        maxWidth: "400px",
        maxHeight: "300px",
        overflow: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        fontSize: "12px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h4>🌐 i18n Debug</h4>
        <div>
          <button
            onClick={() =>
              setResources({ ...i18nInstance.services.resourceStore.data })
            }
            style={{ marginRight: "8px", fontSize: "12px" }}
          >
            🔄
          </button>
          <button onClick={() => setIsVisible(false)}>✕</button>
        </div>
      </div>

      <div>
        <strong>Current Language:</strong> {i18nInstance.language}
      </div>
      <div>
        <strong>Fallback:</strong>{" "}
        {typeof i18nInstance.options.fallbackLng === "string"
          ? i18nInstance.options.fallbackLng
          : Array.isArray(i18nInstance.options.fallbackLng)
          ? i18nInstance.options.fallbackLng.join(", ")
          : "en"}
      </div>
      <div>
        <strong>Available Languages:</strong>{" "}
        {i18nInstance.languages?.join(", ") || "None"}
      </div>

      <h5>📦 Loaded Resources:</h5>
      <pre
        style={{
          fontSize: "10px",
          background: "#f5f5f5",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        {JSON.stringify(resources, null, 2)}
      </pre>

      <h5>🔍 Namespace Status:</h5>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <strong>Main:</strong>{" "}
          <span
            style={{
              color: i18n.hasResourceBundle("en", "main") ? "green" : "red",
            }}
          >
            EN {i18n.hasResourceBundle("en", "main") ? "✅" : "❌"}
          </span>{" "}
          <span
            style={{
              color: i18n.hasResourceBundle("he", "main") ? "green" : "red",
            }}
          >
            HE {i18n.hasResourceBundle("he", "main") ? "✅" : "❌"}
          </span>
        </div>
        <div>
          <strong>Settings:</strong>{" "}
          <span
            style={{
              color: i18n.hasResourceBundle("en", "settings") ? "green" : "red",
            }}
          >
            EN {i18n.hasResourceBundle("en", "settings") ? "✅" : "❌"}
          </span>{" "}
          <span
            style={{
              color: i18n.hasResourceBundle("he", "settings") ? "green" : "red",
            }}
          >
            HE {i18n.hasResourceBundle("he", "settings") ? "✅" : "❌"}
          </span>
        </div>
      </div>

      <h5>🔍 Quick Tests:</h5>
      <div>
        <button onClick={() => console.log("Resources:", resources)}>
          Log Resources
        </button>{" "}
        <button
          onClick={() => {
            console.log("Has main/en:", i18n.hasResourceBundle("en", "main"));
            console.log("Has main/he:", i18n.hasResourceBundle("he", "main"));
            console.log(
              "Has settings/en:",
              i18n.hasResourceBundle("en", "settings")
            );
            console.log(
              "Has settings/he:",
              i18n.hasResourceBundle("he", "settings")
            );
          }}
        >
          Check All Namespaces
        </button>
      </div>
    </div>
  );
}
