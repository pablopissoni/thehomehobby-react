import React from 'react'
import { useLocation } from 'react-router-dom';

export const SearchProducts = () => {

    const location = useLocation();
    console.log("🚀 ~ SearchProducts ~ location:", location)
    const searchPathName = new URLSearchParams(location.pathname);
    const searchTerm = searchPathName.get('product');
    console.log("🚀 ~ SearchProducts ~ searchTerm:", searchTerm)

  return (
    <ul class="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
    <li class="px-6 py-4">
        <div class="flex justify-between">
            <span class="font-semibold text-lg">List Item 1</span>
            <span class="text-gray-500 text-xs">1 day ago</span>
        </div>
        <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
    </li>
    <li class="px-6 py-4">
        <div class="flex justify-between">
            <span class="font-semibold text-lg">List Item 2</span>
            <span class="text-gray-500 text-xs">2 days ago</span>
        </div>
        <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
    </li>
    <li class="px-6 py-4">
        <div class="flex justify-between">
            <span class="font-semibold text-lg">List Item 3</span>
            <span class="text-gray-500 text-xs">3 days ago</span>
        </div>
        <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
    </li>
</ul>
  )
}
