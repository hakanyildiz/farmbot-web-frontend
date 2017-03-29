import * as React from "react";
import {
  IfParams,
  seqDropDown,
  IfBlockDropDownHandler
} from "./index";
import { t } from "i18next";
import { NewFBSelect } from "../../../ui/new_fb_select";

export function Then(props: IfParams) {
  let { onChange, selectedItem } = IfBlockDropDownHandler(props, "_then");
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>THEN...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <NewFBSelect
        allowEmpty={true}
        list={seqDropDown(props.resources)}
        placeholder="Sequence..."
        onChange={onChange}
        selectedItem={selectedItem()} />
    </div>
  </div>
}
