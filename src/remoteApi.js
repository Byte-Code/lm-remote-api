import { createHttpClient } from './httpClient';
import * as paths from './pathConfig';

function createUrl(baseUrl, path, pathParams) {
  const url = [baseUrl, path, ...pathParams].join('/');
  return url;
}

class RemoteApi {
  constructor({ baseUrlCore, baseUrlMS, spaceId, storeCode, apiKey }) {
    this.baseUrlCore = `${baseUrlCore}/${spaceId}`;
    this.baseUrlMS = baseUrlMS;
    this.storeCode = storeCode;
    this.httpClient = createHttpClient(apiKey);
  }

  httpGet(url, params = {}) {
    return this.httpClient.get(url, { params });
  }

  fetchStore() {
    const url = createUrl(this.baseUrlCore, paths.GET_STORE, [this.storeCode]);
    return this.httpGet(url);
  }

  fetchCategoryDisplay = categoryCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_CATEGORY, [categoryCode]);
    return this.httpGet(url);
  };

  fetchProductListDisplay = productIdList => {
    const url = createUrl(this.baseUrlCore, paths.LISTDISPLAY_PRODUCT, [productIdList]);
    return this.httpGet(url);
  };

  fetchProductDisplay = productCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_PRODUCT, [productCode]);
    return this.httpGet(url);
  };

  fetchRelatedProductDisplay = productCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_RELATEDPRODUCT, [productCode]);
    return this.httpGet(url);
  };

  fetchSearchCoords = (pathParams, queryParams) => {
    const { lat, lng } = pathParams;
    const url = createUrl(this.baseUrlCore, paths.COORDS_SEARCH, [lat, lng]);
    return this.httpGet(url, queryParams);
  };

  fetchAllStoreStock = productCode => {
    const url = createUrl(this.baseUrlMS, paths.ALLSTORESTOCK, [productCode]);
    return this.httpGet(url);
  };

  fetchSuggest = productCode => {
    const url = createUrl(this.baseUrlMS, paths.SUGGEST, [productCode]);
    return this.httpGet(url);
  };
}

export default RemoteApi;
