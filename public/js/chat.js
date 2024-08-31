// Initialize Zoho SalesIQ
window.$zoho = window.$zoho || {};
$zoho.salesiq = $zoho.salesiq || {ready: function(){}};

// Create and append the script element
const script = document.createElement('script');
script.id = 'zsiqscript';
script.src = 'https://salesiq.zohopublic.com/widget?wc=siq656d221e7af6b219a6226220c00b9d4afc5c34bf10eab576a6e8b65eb55cdb79';
script.defer = true;
document.body.appendChild(script);