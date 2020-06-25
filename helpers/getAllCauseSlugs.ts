import splApi from "./axios";
import { IUnknownObject } from "interfaces/unknownObject";

export async function getAllCauseSlugs() {
  const { data: fileNames }: { data: IUnknownObject[] } = await splApi.get("/causes/");
  return fileNames.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    };
  });
}

export async function getCauseData(slug: string) {
  const { data: cause }: { data: IUnknownObject } = await splApi.get(`/causes/${slug}`);

  return cause;
}
