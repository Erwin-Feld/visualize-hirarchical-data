import { ref, watch } from "vue";
import { useCookie } from "vue-cookie-next";

// ref contains value of set cookie 
const cookieFilling = ref();

/* detect and set all cookie functionalitys   */
export default function cookieFunctionality(gtag) {
                              // gtag google analytic cookie id

  // interact with set cookie  
  const cookie = useCookie();

  //  if there is a cookie set by clicking the slider button
  // and value is true allow google cookie to set also 
  if (cookie.isCookieAvailable("cookies_consent")) {
    cookieFilling.value = cookie.getCookie("cookies_consent") === "true";
    gtag.optIn();
  } else {
    cookieFilling.value = undefined;
  }

  // watches for changes if cookie is exapted by user deploy it for a year
  watch(cookieFilling, () => {
    if (cookieFilling.value !== undefined) {
      cookie.setCookie("cookies_consent", cookieFilling.value.toString(), {
        expire: "365d",
      });
      if (cookieFilling.value) {
        gtag.optIn();
      } else {
        gtag.optOut();
      }
    }
  });

  // reverse cookie -ereases it by setting value to default /currently dont needed 
  // const showBanner = computed(() => {
  //   return cookieFilling.value === undefined;
  // });

 

  // changes cookie filling to true --> means user accepted store cookies
  function deployCookie() {
    return (cookieFilling.value = true);
  }

  return {
    cookieFilling,
    deployCookie,
  };
}
