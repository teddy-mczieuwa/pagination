import { shallowRef, ref, computed, watchEffect, watch } from "vue";
import type { ComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";

const useApiQuery = (baseUrl: string) => {
  const route = useRoute();
  const router = useRouter();
  const page = ref<number>(Number(route.query.page) || 1);
  const data = shallowRef<any>([]);
  const error = ref<{ message: string }>({ message: "" });
  const loading = shallowRef<boolean>(false);
  const limit = ref<number>(10);
  const limitOptions = shallowRef<number[]>([10, 20, 50, 100, 200, 250]);

  const fetchQuery = async (url: string): Promise<any> => {
    loading.value = true;
    try {
      const response: Response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });
      if (response.ok) {
        data.value = await Promise.resolve(response.json());
        loading.value = false;
      } else {
        loading.value = false;
        throw new Error("Unknown response");
      }
    } catch (err) {
      error.value = { message: "Server error" };
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  const debounceFetch = useDebounceFn(() => {
    fetchQuery(`${baseUrl}?limit=${limit.value}&offset=${offset.value}`);
  }, 1000);

  const totalPages: ComputedRef<number> = computed((): number => {
    return data.value.meta?.["total-pages"]
      ? data.value.meta?.["total-pages"]
      : Math.ceil(data.value.count / limit.value);
  });

  const offset: ComputedRef<number> = computed(
    (): number => limit.value * (page.value - 1)
  );

  const paginationNumbers: ComputedRef<(string | number)[]> = computed(
    (): (string | number)[] => {
      let pageNumbers: Array<number | string> = [];
      if (totalPages.value <= 7) {
        for (let index = 1; index <= totalPages.value; index++) {
          pageNumbers.push(index);
        }
      } else {
        if (page.value <= 4) {
          pageNumbers = [1, 2, 3, 4, 5, "...", totalPages.value];
        } else if (page.value >= totalPages.value - 3) {
          pageNumbers = [
            1,
            "...",
            totalPages.value - 4,
            totalPages.value - 3,
            totalPages.value - 2,
            totalPages.value - 1,
            totalPages.value,
          ];
        } else {
          pageNumbers = [
            1,
            "...",
            page.value - 1,
            page.value,
            page.value + 1,
            "...",
            totalPages.value,
          ];
        }
      }

      return pageNumbers;
    }
  );

  const changePage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      page.value = pageNumber;
      router.push({
        path: route.path,
        query: {
          ...route.query,
          page: pageNumber,
          limit: limit.value,
        },
      });
    }
  };

  watchEffect(() => {
    if (totalPages.value <= page.value) {
      page.value = totalPages.value;
    }
    if (page.value === 0) {
      page.value = 1;
    }

    router.push({
      path: route.path,
      query: {
        ...route.query,
        limit: limit.value,
        page: page.value,
      },
    });
  });

  watch(
    [() => page.value, () => limit.value],
    () => {
      loading.value = true;

      router.push({
        path: route.path,
        query: {
          ...route.query,
          page: page.value,
        },
      });

      debounceFetch();
    },
    { immediate: true, deep: true }
  );

  return {
    changePage,

    data,
    error,
    limit,
    limitOptions,
    loading,
    offset,
    page,
    paginationNumbers,

    totalPages,
  };
};

export default useApiQuery;
