import { emit } from "./SimpleService";
import { booksStore } from "./SubscriberConfigObjectStore";
console.log("booksSlice was rendered");

export type BooksSlice = {
  subscribers: Set<{ subscribe: () => void }>;
  slice: {
    books: string[];
  };
};

const booksSlice: BooksSlice = {
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

//No prop-drilling is needed
export default function BooksSliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("BooksSliceCompnent rendered");
  return <> {children}</>;
}
