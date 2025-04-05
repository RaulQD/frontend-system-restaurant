import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export const usePageTittle = () => {
  const location = useLocation();
  useEffect(() => {
    const pathSegments = location.pathname.split("/"); // Divide la URL en partes
    let title = "Foodie Hub"; // Título por defecto

    if (pathSegments.includes("dashboard")) {
      if (pathSegments.includes("home")) {
        title = "Inicio - Foodie Hub";
      } else if (pathSegments.includes("kitchen")) {
        title = "Cocina - Foodie Hub";
      } else if (pathSegments.includes("table") && pathSegments.includes("order")) {
        title = "Crear Orden - Foodie Hub";
      } else if (pathSegments.includes("orders")) {
        title = "Ordenes Listas - Foodie Hub";
      } else if (pathSegments.includes("table")) {
        title = "Mesas - Foodie Hub";
      } else if (pathSegments.includes("dishes")) {
        title = "Platillos - Foodie Hub";
      } else if (pathSegments.includes("category")) {
        title = "Categorías - Foodie Hub";
      } else if (pathSegments.includes("order-history")) {
        title = "Gestion de Ordenes - Foodie Hub ";
      } else if (pathSegments.includes("employees")) {
        title = "Gestion de Empleados - Foodie Hub ";
      } else if (pathSegments.includes("rooms")) {
        title = "Gestion de Salones - Foodie Hub ";
      } else if (pathSegments.includes("tables")) {
        title = "Gestion de Mesas - Foodie Hub ";
      }
    }

    document.title = title;
  }, [location.pathname])
}