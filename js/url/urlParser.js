const btn = document.querySelector('body');
console.log(btn);
btn.addEventListener("click", function(){
  const url = new URL(location.href);
  console.log(url);
  console.log(url.searchParams);
});
