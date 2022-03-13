import { request } from './request'

// 左侧导航
export function getCategory() {
    return request({
        url: '/category'
    })
}
// 右侧导航
export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey: maitKey
        }
    })
}