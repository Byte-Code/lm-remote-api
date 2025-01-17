import createHttpClient from './httpClient';
import * as paths from './pathConfig';

function createUrl(baseUrl, path, pathParams) {
  const url = [baseUrl, path, ...pathParams].join('/');
  return url;
}

class RemoteApi {
  constructor({ baseUrlCore, baseUrlMS, spaceId, storeCode, apiKeyCore, apiKeyMS }) {
    this.baseUrlCore = baseUrlCore;
    this.spaceId = spaceId;
    this.baseUrlMS = baseUrlMS;
    this.storeCode = storeCode;
    this.httpClientCore = createHttpClient(apiKeyCore);
    this.httpClientMS = createHttpClient(apiKeyMS);
  }

  httpGetCore = (url, params = {}) =>
    this.httpClientCore.get(url, { params }).then(res => res.data, err => err);

  httpGetMS = (url, params = {}) =>
    this.httpClientMS.get(url, { params }).then(res => res.data, err => err);

  fetchStore = () => {
    const url = createUrl(this.baseUrlCore, paths.GET_STORE, [
      this.spaceId,
      this.storeCode,
      this.storeCode
    ]);
    return this.httpGetCore(url);
  };

  fetchCategoryDisplay = categoryCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_CATEGORY, [
      this.spaceId,
      this.storeCode,
      categoryCode
    ]);
    return this.httpGetCore(url);
  };

  // deprecate use fetchListProduct
  fetchProductListDisplay = productIdList => {
    const url = createUrl(this.baseUrlCore, paths.LISTDISPLAY_PRODUCT, [
      this.spaceId,
      this.storeCode,
      ...productIdList
    ]);
    return this.httpGetCore(url);
  };

  // deprecate
  fetchProductDisplay = productCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_PRODUCT, [
      this.spaceId,
      this.storeCode,
      productCode
    ]);
    return this.httpGetCore(url);
  };

  fetchRelatedProductDisplay = productCode => {
    const url = createUrl(this.baseUrlCore, paths.DISPLAY_RELATEDPRODUCT, [
      this.spaceId,
      productCode
    ]);
    return this.httpGetCore(url);
  };

  fetchSearchCoords = (pathParams, queryParams) => {
    const { lat, lng } = pathParams;
    const url = createUrl(this.baseUrlCore, paths.COORDS_SEARCH, [this.spaceId, lat, lng]);
    return this.httpGetCore(url, queryParams);
  };

  fetchAllStoreStock = productCode => {
    const url = createUrl(this.baseUrlMS, paths.ALLSTORESTOCK, [productCode]);
    return this.httpGetMS(url);
  };

  fetchAllStoreStock_v2 = productCode => {
    const url = createUrl(this.baseUrlMS, paths.ALLSTORESTOCK_V2, [productCode]);
    return this.httpGetMS(url);
  };

  fetchSuggest = productCode => {
    const url = createUrl(this.baseUrlMS, paths.SUGGEST, [productCode]);
    return this.httpGetMS(url);
  };

  findActiveStores = () => {
    const url = createUrl(this.baseUrlCore, paths.FIND_ACTIVE_STORES, [this.spaceId]);
    return this.httpGetCore(url);
  };

  fetchRealTimeStock = (queryParams) => {
    const url = createUrl(this.baseUrlMS, paths.REAL_TIME_STOCK, []);
    return this.httpGetMS(url, queryParams);
  };

  fetchListProduct = (queryParams) => {
    const url = createUrl(this.baseUrlMS, paths.LIST_PRODUCT, [
      this.spaceId,
      this.storeCode
    ]);
    return this.httpGetMS(url, queryParams);
  };

  fetchShippingPrice = (productCode, quantity) => {
    const url = createUrl(this.baseUrlMS, paths.SHIPPING_PRICE, [
        productCode,
        quantity
    ]);
    return this.httpGetMS(url);
  };

  fetchProduct = (productCode, queryParams) => {
    const url = createUrl(this.baseUrlMS, paths.PRODUCT, [
        this.spaceId,
        this.storeCode,
        productCode
    ]);
    return this.httpGetMS(url, queryParams);
  };
}

export default RemoteApi;
