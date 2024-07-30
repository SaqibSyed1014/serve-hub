<script setup lang="ts">
import CheckOutlineIcon from 'assets/icons/check-outline.svg'
</script>

<template>
  <div>
    <div class="">
      <section class="py-16 md:py-24 bg-white-dark">
        <div class="container md:px-8">
          <div class="text-center mx-auto w-full max-w-3xl md:mb-16">
            <h3 class="text-brand-600 test-sm md:text-base mb-3">FAQs</h3>
            <h2 class="text-3xl md:text-4xl mb-6">Frequently asked questions</h2>
            <p class="text-black-light md:text-xl font-normal mb-8 md:mb-0">
              Everything you need to know about the product and billing. Can't find the answer you're looking for?
              <span class="underline hover:no-underline">Please chat to our friendly team.</span>
            </p>
            <form class="hidden">
              <div class="relative">
                <input type="search" name="search" id="search" class="form-input pl-12" placeholder="Search">
                <button type="button" class="w-11 h-11 flex items-center justify-center absolute left-0 inset-y-0 m-auto">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                        stroke="#667085"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section class="py-16 md:py-17">
        <div class="container">
          <div class="grid md:grid-cols-3 md:gap-x-8 gap-10 md:gap-y-16 text-center">
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">Is there a free trial available?</h3>
              <p class="text-black-light font-normal">Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
            </div>
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">Can I change my plan later?</h3>
              <p class="text-black-light font-normal">Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.</p>
            </div>
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.93 4.93L19.07 19.07M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">What is your cancellation policy?</h3>
              <p class="text-black-light font-normal">We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.</p>
            </div>
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">Can other info be added to an invoice?</h3>
              <p class="text-black-light font-normal">At the moment, the only way to add additional information to invoices is to add the information to the workspace's name.</p>
            </div>
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10H2M11 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H17M11 19L13 21M11 19L13 17M7 19H5.2C4.07989 19 3.51984 19 3.09202 18.782C2.71569 18.5903 2.40973 18.2843 2.21799 17.908C2 17.4802 2 16.9201 2 15.8V8.2C2 7.0799 2 6.51984 2.21799 6.09202C2.40973 5.71569 2.7157 5.40973 3.09202 5.21799C3.51984 5 4.0799 5 5.2 5H13M13 5L11 7M13 5L11 3" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">How does billing work?</h3>
              <p class="text-black-light font-normal">Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.</p>
            </div>
            <div class="">
              <div class="w-12 h-12 mx-auto border border-[#EAECF0] text-[$344054] rounded-[10px] flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl mb-2">How do I change my account email?</h3>
              <p class="text-black-light font-normal">You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="pb-16 md:pb-24">
        <div class="container">
          <div class="py-8 px-4 bg-white-dark text-center rounded-2xl">
            <img src="/images/others/avatars-group.png" alt="" class="mx-auto mb-8">
            <h3 class="text-xl mb-2">Still have questions?</h3>
            <p class="text-black-light font-normal mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <BaseButton label="Get in touch" class="mx-auto"/>
          </div>
        </div>
      </section>
      <section class="border-t border-[#EAECF0] pb-16 md:py-24 overflow-hidden">
        <div class="relative">
          <div class="container">
            <div class="grid lg:grid-cols-2">
              <div class="py-16">
                <h2 class="text-3xl md:text-5xl mb-8">Join 4,000+ startups growing with Untitled</h2>
                <ul class="text-black-light md:text-lg font-normal mb-8 md:mb-12 space-y-4 md:space-y-5">
                  <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <CheckOutlineIcon class="w-6 h-6 text-brand-600" />
                    </span>
                    30-day free trial
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <CheckOutlineIcon class="w-6 h-6 text-brand-600" />
                    </span>
                    Peronalized onboarding
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="shrink-0">
                        <CheckOutlineIcon class="w-6 h-6 text-brand-600" />
                    </span>
                    Access to all features
                  </li>
                </ul>
                <BaseButton label="Get started" />
              </div>
              <div class="lg:absolute top-0 -right-5 lg:w-1/2 mb:pb-0">
                <img src="/images/others/faq-img.png" alt="FAQ Image" class="w-full h-full">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
