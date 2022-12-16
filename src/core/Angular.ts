import angular from "angular";

export const ng = window.angular;

export interface WxBodyScope extends angular.IScope {
  isIPad: boolean;
  isMacOS: boolean;
  isWindows: boolean;
  isUnLogin: boolean;
  isLoaded: boolean;
  isShowReader: boolean;
}
