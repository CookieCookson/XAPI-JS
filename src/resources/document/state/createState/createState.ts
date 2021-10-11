import { AxiosPromise } from "axios";
import { Resources } from "../../../../constants";
import XAPI from "../../../../XAPI";
import { CreateStateParams } from "./createStateParams";

export function createState(
  this: XAPI,
  params: CreateStateParams
): AxiosPromise<void> {
  const headers = {};
  if (params.etag && params.matchHeader)
    headers[params.matchHeader] = params.etag;
  return this.requestResource(
    Resources.STATE,
    {
      agent: params.agent,
      activityId: params.activityId,
      stateId: params.stateId,
      ...(params.registration
        ? {
            registration: params.registration,
          }
        : {}),
    },
    {
      method: "POST",
      data: params.state,
      headers: headers,
    }
  );
}
