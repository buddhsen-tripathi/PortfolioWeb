'use client'

import { CalendarHeart, CalendarPlus, ArrowUpRight } from 'lucide-react'
import React, { useState } from 'react'
import { useLanguage } from './LanguageProvider'

export default function NewsletterSubscription() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const { language } = useLanguage()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || (language === 'zh'
                    ? '订阅失败，请稍后再试。'
                    : 'Unable to subscribe. Please try again later.'))
            }
            setSuccess(true)
            setEmail('')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="space-y-4 duration-1000 animate-in fade-in fill-mode-both animation-delay-[1300ms]">
            <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
                {language === 'zh' ? '保持更新。' : 'stay updated.'}
            </h2>
            <div className="prose max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
                <p>
                    {language === 'zh' ? (
                        <>完全<span className='text-green-600 font-medium'>免费！</span>每当有新文章发布时，你会第一时间收到通知。</>
                    ) : (
                        <>It&apos;s <span className='text-green-600 font-medium'>free!</span> Get notified instantly whenever a new post drops. Stay updated, stay ahead.</>
                    )}
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'zh' ? '你的邮箱@示例.com' : 'your@email.com'}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background transition-colors"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
                        success 
                            ? 'text-green-600 bg-green-50 dark:bg-green-950/30' 
                            : 'text-primary-foreground bg-primary hover:bg-primary/90'
                    }`}
                >
                    {success ? (
                        <>
                            <CalendarHeart size={14} />
                            {language === 'zh' ? '已订阅！' : 'subscribed!'}
                        </>
                    ) : loading ? (
                        <>
                            <div className="animate-spin h-3.5 w-3.5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                            {language === 'zh' ? '订阅中...' : 'subscribing...'}
                        </>
                    ) : (
                        <>
                            <CalendarPlus size={14} />
                            {language === 'zh' ? '订阅' : 'subscribe'}
                            <ArrowUpRight size={12} />
                        </>
                    )}
                </button>
            </form>
            {(error || success) && (
                <p className="text-xs">
                    {error ? (
                        <span className="text-destructive">{error}</span>
                    ) : (
                        <span className="text-green-600">
                            {language === 'zh'
                                ? '设置完成！请查看邮箱中的确认邮件。'
                                : "You're all set! Check your inbox for confirmation."}
                        </span>
                    )}
                </p>
            )}
        </section>
    )
}
