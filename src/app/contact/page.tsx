"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Need to add textarea
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center gap-8"
                >
                    <div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-4">
                            Send a Signal
                        </h1>
                        <p className="font-body text-muted-foreground text-lg">
                            Whether it's a project inquiry, a debate on consciousness, or just saying hello to the machine.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-lg">hello@digital-mandapa.io</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-lg">Mumbai, India | The Cloud</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Phone className="w-5 h-5" />
                            </div>
                            <span className="text-lg">+91 98765 43210</span>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side - The "Inscription Plate" */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Card className="p-8 bg-card/40 backdrop-blur-md border border-primary/20 shadow-[0_0_30px_-10px_rgba(197,160,89,0.1)] relative overflow-hidden">
                        {/* Decorative Corner Ornaments */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />

                        <form className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Identity</label>
                                <Input placeholder="Your Name" className="bg-background/50 border-primary/20 focus:border-primary/60" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Frequency</label>
                                <Input placeholder="your@email.com" type="email" className="bg-background/50 border-primary/20 focus:border-primary/60" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Transmission</label>
                                <Textarea placeholder="Write your message..." className="bg-background/50 border-primary/20 focus:border-primary/60 min-h-[150px]" />
                            </div>

                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wide text-lg h-12">
                                Transmit <Send className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>

            </div>
        </div>
    );
}
