// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   ArrowLeft,
//   BookOpen,
//   Plus,
//   Check,
//   ExternalLink,
//   BookMarked,
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { BookPageSkeleton } from './components';
// import { useNavigate, useParams } from '@tanstack/react-router';
// import { useGetBookDetail } from './hooks/use-get-book-details';

// // Renomeado para BookDetailPage para seguir o padrão de página
// export const BookDetailPage = () => {
//   const navigate = useNavigate({ from: '/book/$bookId' });
//   const { bookId } = useParams({ from: '/book/$bookId' });

//   const { book, isLoading, isError, error, onShelf, handleToggleShelf, t } =
//     useGetBookDetail();

//   if (isLoading) {
//     return <BookPageSkeleton />;
//   }

//   // Se houver erro na requisição ou o livro não for encontrado/tiver erro na resposta da API
//   if (isError || !book || book.error) {
//     const errorMessage = isError ? error?.message : book?.error?.message;
//     return (
//       <div className='text-center py-24'>
//         <p className='text-muted-foreground'>
//           {t('detail.notFound')}
//           {errorMessage && ` (${errorMessage})`}
//         </p>
//         <Button
//           variant='outline'
//           onClick={() => navigate(-1)}
//           className='mt-4 gap-2'
//         >
//           <ArrowLeft className='w-4 h-4' />
//           {t('detail.back')}
//         </Button>
//       </div>
//     );
//   }

//   const info = book.volumeInfo || {};
//   const thumb =
//     info.imageLinks?.medium ||
//     info.imageLinks?.thumbnail ||
//     info.imageLinks?.smallThumbnail;
//   const description = info.description || '';
//   const previewLink = info.previewLink;
//   const isbn =
//     info.industryIdentifiers?.find((i) => i.type === 'ISBN_13')?.identifier ||
//     info.industryIdentifiers?.find((i) => i.type === 'ISBN_10')?.identifier;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className='space-y-8'
//     >
//       <Button
//         variant='ghost'
//         onClick={() => navigate(-1)}
//         className='gap-2 -ml-2 text-muted-foreground hover:text-foreground'
//       >
//         <ArrowLeft className='w-4 h-4' />
//         {t('detail.back')}
//       </Button>

//       <div className='flex flex-col md:flex-row gap-8 lg:gap-12'>
//         {/* Cover */}
//         <div className='shrink-0 mx-auto md:mx-0'>
//           <div className='w-48 sm:w-56 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 bg-secondary/50'>
//             {thumb ? (
//               <img
//                 src={thumb}
//                 alt={info.title}
//                 className='w-full object-cover'
//               />
//             ) : (
//               <div className='w-full aspect-2/3 flex items-center justify-center'>
//                 <BookOpen className='w-16 h-16 text-muted-foreground/30' />
//               </div>
//             )}
//           </div>

//           <div className='mt-6 space-y-3'>
//             <Button
//               onClick={handleToggleShelf}
//               className={`w-full gap-2 ${onShelf ? 'bg-green-600 hover:bg-green-700' : ''}`}
//               variant={onShelf ? 'default' : 'default'}
//             >
//               {onShelf ? (
//                 <>
//                   <Check className='w-4 h-4' />
//                   {t('detail.removeFromShelf')}
//                 </>
//               ) : (
//                 <>
//                   <Plus className='w-4 h-4' />
//                   {t('detail.addToShelf')}
//                 </>
//               )}
//             </Button>

//             {previewLink && (
//               <Button variant='outline' className='w-full gap-2' asChild>
//                 <a href={previewLink} target='_blank' rel='noopener noreferrer'>
//                   <ExternalLink className='w-4 h-4' />
//                   {t('detail.preview')}
//                 </a>
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Info */}
//         <div className='flex-1 min-w-0'>
//           <h1 className='text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-tight'>
//             {info.title}
//           </h1>
//           {info.subtitle && (
//             <p className='text-lg text-muted-foreground mt-1'>
//               {info.subtitle}
//             </p>
//           )}
//           <p className='text-primary font-medium mt-3'>
//             {info.authors?.join(', ') || '—'}
//           </p>

//           {/* Meta */}
//           <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6'>
//             {info.publisher && (
//               <MetaItem label={t('detail.publisher')} value={info.publisher} />
//             )}
//             {info.publishedDate && (
//               <MetaItem
//                 label={t('detail.publishedDate')}
//                 value={info.publishedDate}
//               />
//             )}
//             {info.pageCount && (
//               <MetaItem label={t('detail.pages')} value={info.pageCount} />
//             )}
//             {isbn && <MetaItem label={t('detail.isbn')} value={isbn} />}
//             {info.language && (
//               <MetaItem
//                 label={t('detail.language')}
//                 value={info.language.toUpperCase()}
//               />
//             )}
//           </div>

//           {/* Categories */}
//           {info.categories?.length > 0 && (
//             <div className='mt-6'>
//               <p className='text-sm font-medium text-muted-foreground mb-2'>
//                 {t('detail.categories')}
//               </p>
//               <div className='flex flex-wrap gap-2'>
//                 {info.categories.map((cat) => (
//                   <Badge key={cat} variant='secondary' className='font-normal'>
//                     {cat}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Synopsis */}
//           <div className='mt-8'>
//             <h2 className='text-lg font-serif font-semibold mb-3 flex items-center gap-2'>
//               <BookMarked className='w-5 h-5 text-primary' />
//               {t('detail.synopsis')}
//             </h2>
//             {description ? (
//               <Card className='border-border/50'>
//                 <CardContent className='p-5'>
//                   <div
//                     className='prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed'
//                     dangerouslySetInnerHTML={{ __html: description }}
//                   />
//                 </CardContent>
//               </Card>
//             ) : (
//               <p className='text-muted-foreground italic'>
//                 {t('detail.noSynopsis')}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };
