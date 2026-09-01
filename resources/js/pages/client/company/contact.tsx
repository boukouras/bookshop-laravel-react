import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/custom/contact-form";

export default function Contact() {
    const title = "Contact Us"
    const description = "Have a question or need assistance? Reach out through any of the channels below."
    const emailLabel = "Email"
    const emailDescription = "We respond to all emails within 24 hours."
    const email = "hello@example.com"
    const officeLabel = "Office"
    const officeDescription = "Drop by our office for a chat."
    const officeAddress = "1 Eagle St, Brisbane, QLD, 4000"
    const phoneLabel = "Phone"
    const phoneDescription = "We're available Mon-Fri, 9am-5pm."
    const phone = "(123) 456-7890"
    const chatLabel = "Live Chat"
    const chatDescription = "Get instant help from our support team."
    const chatLink = "Start Chat"

    return (
        <section className="py-24 px-10">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-14">
                        <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                            {title}
                        </h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl bg-muted/50 p-8">
                            <Mail className="mb-4 size-5 text-muted-foreground" />
                            <p className="mb-1 font-medium">{emailLabel}</p>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {emailDescription}
                            </p>
                            <a href={`mailto:${email}`} className="hover:underline">
                                {email}
                            </a>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-8">
                            <MapPin className="mb-4 size-5 text-muted-foreground" />
                            <p className="mb-1 font-medium">{officeLabel}</p>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {officeDescription}
                            </p>
                            <a href="#" className="hover:underline">
                                {officeAddress}
                            </a>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-8">
                            <Phone className="mb-4 size-5 text-muted-foreground" />
                            <p className="mb-1 font-medium">{phoneLabel}</p>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {phoneDescription}
                            </p>
                            <a href={`tel:${phone}`} className="hover:underline">
                                {phone}
                            </a>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-8">
                            <MessageCircle className="mb-4 size-5 text-muted-foreground" />
                            <p className="mb-1 font-medium">{chatLabel}</p>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {chatDescription}
                            </p>
                            <a href="#" className="hover:underline">
                                {chatLink}
                            </a>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </section>
    );
};

