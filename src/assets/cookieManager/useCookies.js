import { ref, watch, computed } from 'vue';
import { useCookie } from 'vue-cookie-next';

const allowCookies = ref();
// Add change name 
export default function mediumCookies(gtag) {

 
  const cookie = useCookie();

  if (cookie.isCookieAvailable('cookies_consent')) {
    allowCookies.value = cookie.getCookie('cookies_consent') === 'true';
    console.log("got consent")
    gtag.optIn();
  } else {
    allowCookies.value = undefined;
  }

  watch(allowCookies, () => {
    if (allowCookies.value != undefined) {
      cookie.setCookie('cookies_consent', allowCookies.value.toString(), {
        expire: '365d',
      });
      if (allowCookies.value) {
       
        gtag.optIn();
        console.log(gtag.optIn())
       
      } else {
        gtag.optOut();
      }
    }
  });

  const showBanner = computed(() => {
    return allowCookies.value === undefined;
  });

  const currentCookieValue = computed(() => {
    return allowCookies.value;
  });

  function okClicked(){
    return allowCookies.value = true;
  }

  return {
    allowCookies,
    showBanner,
    okClicked,
    currentCookieValue,
  };
}

