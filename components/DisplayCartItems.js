function DisplayCartItems(section, totalprice, items) {
  let totalprice = 0;
  let item;
  for (let i = 0; i < items.length; i++) {
    item = items[i];
    totalprice += item.price;
    section.innerHTML += `<div class="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-cyan-100 shadow-sm">
  <div class="flex items-center gap-2.5 min-w-0">
    <img
      class="w-6 h-6 rounded bg-cyan-50 p-0.5 object-contain shrink-0"
      src="../public/${item.subject.toLocaleLowerCase()}.svg"
      alt="${item.subject}"
    />
    <div class="truncate">
      <h2 class="text-xs font-semibold text-gray-800 truncate">${item.title}</h2>
      <p class="text-[10px] text-gray-500 truncate">${item.slot} ${item.location}</p>
    </div>
  </div>

  <span class="text-xs font-bold text-cyan-800 shrink-0">${item.price} DH</span>
</div>`;
  }
  TotalPriceElement.textContent = `${totalprice} MAD / MONTH`;
}
