import { emit } from "./SimpleService";
import { booksStore } from "./SubscriberConfigObjectStore";

console.log("booksSlice was rendered");
const booksSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  slice: {
    books: string[];
  };
} = {
  subscribers: new Set(),
  slice: {
    books: [],
  },
};
booksStore.set("booksSlice", booksSlice);

export function addBook(bookTitle: string) {
  const newBooks = booksSlice.slice.books.slice();
  newBooks.push(bookTitle);
  booksSlice.slice.books = newBooks;
  emit(booksSlice);
}

//Simulate a http request to pre-populate books. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  booksSlice.slice.books = [
    "The Bourne Identity11111111",
    "The Adventures of Sherlock Holmes",
  ];
  emit(booksSlice);
}, 3000);

export default function BooksSliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("BooksSliceCompnent rendered");
  return <> {children}</>;
}
