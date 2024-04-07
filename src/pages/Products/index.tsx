import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "umi";

import styles from "./index.less";
import ProductList from "@/pages/Products/components/ProductList";
import Ruler from "@scena/ruler";

export default function Page() {
  const rulerRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const productsQuery = useQuery(["products"], {
    queryFn() {
      return axios.get("/api/products").then((res) => res.data);
    },
  });
  const productsDeleteMutation = useMutation({
    mutationFn(id: string) {
      return axios.delete(`/api/products/${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  useEffect(() => {
    setTimeout(() => {
      const ruler = new Ruler(document.getElementById("box")!, {
        type: "horizontal",
        zoom: 1,
        height: 30,
      });
      window.addEventListener("resize", () => {
        ruler.resize();
      });
    }, 1000);
  }, []);

  // if (productsQuery.isLoading) return null;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative" }} ref={rulerRef} id="box"></div>
      <h1 className={styles.title}>Page products</h1>
      {/* <ProductList
        products={productsQuery.data.data}
        onDelete={(id) => {
          productsDeleteMutation.mutate(id);
        }}
      /> */}
    </div>
  );
}
