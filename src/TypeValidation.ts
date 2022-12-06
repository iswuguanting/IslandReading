// 主页轮播图的数据类型判断
export interface LessonsType {
    article: string | string[]
    id: string
    title: string
    author: {
        id: number | string
        name: string
    }
    date_by_day: number | string
    created_at: number | string
    updated_at: number | string
    provenance: string
    comment_count: number
    favourite_count: number
    time1?: string
    time2?: string
    time3?: string

}

interface articleType {
    0: string
}

export interface peopleType {
    item: any
    [x: string]: any
    content: string | number
    content_tr_zh_hant?: string
    created_at: number
    id: string
    lesson_id: string
    user: {
        avatar: string
        id: string
        nickname: string
    }
    times?: string
    dataset?: LessonsType
}

export interface commentType {
    name: string
    value: string
    english: string
    TimData: LessonsType[]
}
