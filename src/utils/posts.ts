import { marked } from 'marked'

//文章元数据类型
export interface PostMeta {
    slug: string
    title: string
    date: string
    summary: string
}

//解析Front Matter
function parseFrontMatter(content: string): { meta: Record<string, string>, body: string } {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) {
        return { meta: {}, body: content }
    }

    const meta: Record<string, string> = {}
    const frontMatter = match[1]
    const body = match[2]
    
    if (frontMatter) {
        frontMatter.split('\n').forEach(line => {
            const [key, ...rest] = line.split(':')
            if (key && rest.length) {
                meta[key.trim()] = rest.join(':').trim()
            }
        })
    }

    return { meta, body: body || '' }
}

//获取所有文章列表
export async function getPosts(): Promise<PostMeta[]> {
    const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' })
    const posts: PostMeta[] = []

    for (const path in modules) {
        const fileName = path.split('/').pop()
        const slug = fileName ? fileName.replace('.md', '') : ''
        const loader = modules[path]
        if (loader) {
            const content = await loader() as string
            const { meta } = parseFrontMatter(content)
            posts.push({
                slug,
                title: meta.title || slug,
                date: meta.date || '',
                summary: meta.summary || ''
            })
        }
    }

    //按日期倒序排列
    return posts.sort((a, b) => b.date.localeCompare(a.date))
}

//获取单篇文章内容
export async function getPost(slug: string): Promise<{ meta: PostMeta, html: string } | null> {
    const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' })
    const path = `/src/posts/${slug}.md`

    const loader = modules[path]
    if (!loader) {
        return null
    }

    const content = await loader() as string
    const { meta, body } = parseFrontMatter(content)
    const html = await marked(body)

    return {
        meta: {
            slug,
            title: meta.title || slug,
            date: meta.date || '',
            summary: meta.summary || ''
        },
        html
    }
}
