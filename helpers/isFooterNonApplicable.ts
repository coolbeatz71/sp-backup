import lodash from "lodash";
import nonApplicableRoutes from "constants/nonApplicableFooterRoutes";

export default (path: string) =>
  nonApplicableRoutes.some((pathNames) =>
    lodash.isEqual(
      lodash.compact(pathNames.split("/")),
      lodash.compact(path.split("/")),
    ),
  );
