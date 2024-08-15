interface Blog {
    id: number
    title: string
    author: AuthorDetail
    category?: Category
    post_content: string
    post_excerpt: string
    post_date: string
    publishedAt: Date
    updatedAt: Date
    createdAt: Date
    slug: string
    reading_time: string
    post_photo: BlogPostPhoto
}

interface BlogCategory {
    id: number;
    category_name: string;
    category_slug: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
}


interface AuthorDetail {
    id: number
    name: string
    avatar: string
}

interface BlogPostPhoto {
    id: string
    url: string,
    width: number
    height: number
    name: string
    ext: string
}

interface Category {
    id: number
    category_name: string
}


interface BlogResponseType {
    data: Blog[]
    meta: {
        pagination: Pagination
    }
}

interface BlogCategoriesResponseType {
    data: BlogCategory[]
    meta: {
        pagination: Pagination
    }
}
