export const agentRoutePath = [
    '/users/:id/edit',
    '/users',
    '/users/:id',
    '/users/:id/change-password',
    '/coupons/:id',
    '/coupons',
    '/coupon-types/:id',
    '/coupon-types'
]
export const superAgentRoutePath = agentRoutePath.concat(['/deposits/:id', '/deposits'])
export const subAgentRoutePath = [
    '/users/:id/change-password',
    '/coupons/:id',
    '/coupons',
    '/coupon-types/:id',
    '/coupon-types'
]
