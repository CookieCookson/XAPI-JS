import { AxiosPromise } from "axios";
import { Resources } from "../../../constants";
import XAPI from "../../../XAPI";
import { Activity } from "../Activity";
import { GetActivityParams } from "./getActivityParams";

export function getActivity(
  this: XAPI,
  params: GetActivityParams
): AxiosPromise<Activity> {
  return this.requestResource(Resources.ACTIVITIES, params);
}