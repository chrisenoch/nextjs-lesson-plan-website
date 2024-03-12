import { emit } from "./SubscriberService";
import { booksStore } from "./SubscriberConfigObjectStore";
import { delay } from "@/utils/delay";
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

export function selectBooks() {
  return booksSlice.slice.books;
}

let hasInit = false;
export async function initBooksSlice() {
  if (!hasInit) {
    console.log("init book slice");
    //Simulate a http request to pre-populate books. Could use generateStaticParams# here to increase speed.
    await delay(() => {
      console.log("after delay");
      booksSlice.slice.books = [
        "The Bourne Identity11111111",
        "The Adventures of Sherlock Holmes",
      ];
      emit(booksSlice);
    }, 1000);
    hasInit = true;
  }
  return booksSlice.slice;
}
