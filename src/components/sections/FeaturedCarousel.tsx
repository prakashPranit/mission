"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const projects = [
    {
        title: "Project Alpha",
        category: "Full Stack",
        description: "A comprehensive dashboard for IoT device management.",
        tech: ["Next.js", "MQTT", "Node.js"],
    },
    {
        title: "Neuro-Interface",
        category: "Hardware",
        description: "Brain-computer interface signal processing unit.",
        tech: ["Python", "C++", "Signal Processing"],
    },
    {
        title: "Vedic AI",
        category: "AI/ML",
        description: "Generative art based on ancient script patterns.",
        tech: ["PyTorch", "React", "WebGL"],
    },
    {
        title: "EcoSense",
        category: "IoT",
        description: "Smart agriculture monitoring system.",
        tech: ["ESP32", "LoRaWAN", "Dashboard"],
    },
];

export function FeaturedCarousel() {
    return (
        <section className="py-20 bg-background/50">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end mb-12 text-center md:text-left">
                    <div>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-2">
                            Selected Works
                        </h2>
                        <p className="font-body text-muted-foreground">Architecting the future, one project at a time.</p>
                    </div>
                    <Button variant="outline" className="hidden md:flex gap-2 border-primary/50 text-primary hover:bg-primary/10">
                        View All Projects <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-8 py-10">
                        {projects.map((project, index) => (
                            <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                                <motion.div
                                    whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="h-full"
                                >
                                    <Card className="rounded-3xl h-[320px] bg-card/40 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors overflow-hidden group">
                                        <CardContent className="p-6 flex flex-col h-full gap-4 relative">
                                            {/* Background Image / Gradient Placeholder */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />

                                            <div className="relative z-10 flex justify-between items-start">
                                                <div className="text-xs font-bold px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/20 uppercase tracking-wider">
                                                    {project.category}
                                                </div>
                                            </div>

                                            <div className="relative z-10 mt-auto">
                                                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-heading">
                                                    {project.title}
                                                </h3>
                                                <p className="font-body text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-border/10">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">#{t}</span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-4 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary" />
                    <CarouselNext className="hidden md:flex -right-4 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary" />
                </Carousel>

                <div className="mt-8 md:hidden flex justify-center">
                    <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                        View All Projects <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
