
// ACCOUNT
const LOGIN = 'user/login?'
const REGISTER = 'user/dang-ky?'
const PROFILE = 'user/profile?'
const LOGOUT = 'user/logout?'
const UPDATE_PROFILE = 'user/update-profile?'
const CHANGE_PASSWORD = 'user/change-password?'
const FORGOT_PASSWORD = 'user/forget-password?'

// ADDRESS
const LIST_ADDRESS = 'user/get-list-address-user?'
const ADD_ADDRESS = 'user/add-user-address?'
const UPDATE_ADDRESS = 'user/update-user-address?'
const DELETE_ADDRESS = 'user/delete-user-address?'

// HOME
const LIST_HOME = 'restaurant/list-restaurant-home?'

// CATEGORY
const LIST_CATEGORY = 'category/list-category'

// PROMOTION
const LIST_PROMOTION = 'restaurant/view-more-promotion-restaurant-home-all?'

// RESTAURANT
const LIST_RESTAURANT = 'restaurant/list-restaurant'
const SEARCH_RESTAURANT = 'restaurant/search-restaurant?'

// FOOD
const ALL_FOOD = 'product/list-detail?'
const LIST_FOOD_CATEGORY = 'food/list-food-category?'
const LIST_FOOD_OF_RESTAURANT = 'food/list-food-restaurant?'
const FOOD_DETAILS = 'food/detail-food?'
const SEARCH_FOOD = 'food/search-food?'

// ORDERS
const ORDER = 'order/order?'
const ORDER_HISTORY = 'order/order-history?'
const ORDER_TRACKING = 'ecommerce/api/update-tracking-delivery?'
const GET_TRACKING = 'get-tracking-delivery?'

// RATE
const RATE = 'review/index?'
const LIST_RATED = 'review/list?'

// FAVOURITES
const FAVOURITE = 'favourite/index?' 
const LIST_FAVOURITE = 'favourite/list?'

// NOTIFICATIONS
const LIST_NOTIFICATION = 'utility/list-notification?'

export default {  
    LOGIN,
    REGISTER,
    LOGOUT,
    UPDATE_PROFILE,
    PROFILE,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
    LIST_CATEGORY,
    LIST_PROMOTION,
    LIST_RESTAURANT,
    SEARCH_RESTAURANT,
    ALL_FOOD,
    LIST_FOOD_CATEGORY,
    LIST_FOOD_OF_RESTAURANT,
    FOOD_DETAILS,
    SEARCH_FOOD,
    ORDER,
    RATE,
    LIST_RATED,
    LIST_HOME,
    LIST_ADDRESS,
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
    ORDER_HISTORY,
    ORDER_TRACKING,
    GET_TRACKING,
    FAVOURITE,
    LIST_FAVOURITE,
    LIST_NOTIFICATION
}