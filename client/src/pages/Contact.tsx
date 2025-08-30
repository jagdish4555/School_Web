export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-3 text-gray-700">
        <p><strong>School:</strong> SHETH D.H. HIGH SCHOOL, JAGUDAN</p>
        <p><strong>Address:</strong> Jagudan, Mehsana, Gujarat</p>
        <p><strong>Phone:</strong> +91 9428752528</p>
        <p><strong>Email:</strong> dhjagudan@gmail.com</p>
        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.485695657035!2d72.40784237431812!3d23.515027297773752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c40a4db6fdea5%3A0x90e10c290bafd0ec!2sSheth%20D%20H%20High%20School%20Jagudan!5e0!3m2!1sen!2sin!4v1754753026954!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}


