export type StrapiPaginationMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: StrapiPaginationMeta;
};

export async function fetchData<T = unknown>(
  url: string,
  authToken = process.env.STRAPI_TOKEN,
): Promise<T> {
  const headers = {
    next: { revalidate: 300 },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, headers);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 6, pageCount: 0, total: 0 } },
    } as T;
  }
}
