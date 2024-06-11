'use client'
import { ChangeEventHandler, useEffect, useState } from "react";
import { bookCategories } from "./bookCategories";
import GradientShadowBox from "@/components/GradientShadowBox";
import toast from "react-hot-toast";
import { sendPrompt } from "./sendPromptAction";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[]>([]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddValue = (value: string) => {
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
    setInputValue('');
  };

  const handleRemoveValue = (valueToRemove: string) => {
    setSelectedCategories(selectedCategories.filter(value => value !== valueToRemove));
  };

  const filteredBookCategories = bookCategories.filter(bookCategory =>
    bookCategory.toLowerCase().includes(inputValue.toLowerCase()) &&
    !selectedCategories.includes(bookCategory)
  );
  const handleLanguageSelect = (language: string, isChecked: boolean) => {
    if (isChecked) {
      languages.push(language);
    } else {
      setLanguages(languages.filter(currLang => currLang !== language));
    }
  }
  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      toast.error("En az 1 kategori seçilmiş olmalı")
      return;
    }
    if (languages.length === 0) {
      toast.error("En az 1 dil seçilmiş olmalı")
      return;
    }
    /*
      Prompt oluşturulması ve backende istek atılması
    */
    setResult([]);
    setIsLoading(true);
    const prompt = `${selectedCategories.toString()} bunların hepsini içeren ${languages.toString()} dilinde 5 kitap önerebilir misin? sadece liste ver yorum ekleme dile göre ayrım yapma.`;
    const response = await sendPrompt(prompt);
    const parsedResult = response.split("\n");
    setResult(parsedResult);
    setIsLoading(false);
  }



  return (
    <main className="flex-col min-h-screen items-center justify-center bg-black  p-4 sm:pt-12 md:pt-16 lg:pt-20">
      <GradientShadowBox>
        <div className="p-2 md:p-6">
          <h2 className="text-2xl text-light font-bold mb-4 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
            Kategoriler
            <span className="ml-2 font-semibold text-sm">Sevdiğiniz kitap türlerini seçiniz</span>
          </h2>
          {/* secilen kategoriler */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategories.map((value, idx) => (
              <div key={idx} className="flex items-center bg-purple-900 text-white px-2 py-1 rounded">
                {value}
                <button
                  className="ml-2 text-sm"
                  onClick={() => handleRemoveValue(value)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {/* kategori input */}
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className=" bg-gray-800 text-gray-200 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-100"
              placeholder="Kategorilerde Arayın..."
            />

            {/* filtrelenmis kategoriler */}
            <ul className="h-48 relative mt-2 border rounded  overflow-scroll overflow-x-hidden">
              {filteredBookCategories.map((category, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-900 hover:text-white"
                  onClick={() => handleAddValue(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>


          {/* dil tercihi */}
          <div className="mt-4 ">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
              Dil Tercihi
              <span className=" ml-2 font-semibold text-sm">Tercih ettiğiniz dilleri seçiniz</span>
            </h2>

            <div className="flex items-center mb-4">
              <input onChange={(e) => handleLanguageSelect(e.target.value, e.target.checked)} id="default-checkbox" type="checkbox" value="türkçe" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-white-900 dark:text-white-300">Türkçe</label>
            </div>
            <div className="flex items-center">
              <input onChange={(e) => handleLanguageSelect(e.target.value, e.target.checked)} id="checked-checkbox" type="checkbox" value="ingilizce" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-white-900 dark:text-white-300">İngilizce</label>
            </div>
          </div>

          <div className="mt-4 flex">
            <button onClick={handleSubmit} type="button" className="ml-auto text-white w-32 bg-purple-900 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">
              <span data-loading={isLoading} className="data-[loading=true]:hidden">Kitap Öner</span>
              <span data-loading={isLoading} className="hidden data-[loading=true]:block">
                <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-purple-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </span>
            </button>
          </div>

          <div data-result={result.length !== 0} className="max-h-0 data-[result=true]:max-h-[9999px] transition-all duration-500 overflow-clip">
            <h1 className="text-2xl mb-4 font-bold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">Öneri listeniz</h1>
            <ul className="pl-4 space-y-4 list-disc list-inside">
              {result.map((recommendation, idx) => (
                <li key={idx}>
                  <span className="inline-flex gap-2 items-center justify-center">
                    {recommendation}
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(recommendation)}`} target="_blank" rel="noopener noreferrer">
                      <svg className="w-5 h-5 text-white hover:text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                      </svg>
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </GradientShadowBox>

    </main>
  );
}
