"""
LEBRONES SERVICES — Image Generator
Generates all landing page images using Stable Diffusion (Realistic Vision v5.1)
Optimized for GTX 1660 Ti 6GB VRAM
"""

import torch
import os
import gc
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(r"C:\Users\Chronos3770\Documents\LEBRONES_SRL\09 - DIRECCION CREATIVA Y GRAFICA\Assets\generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MODEL_ID = "SG161222/Realistic_Vision_V5.1_noVAE"
VAE_ID = "stabilityai/sd-vae-ft-mse"

# Common settings
NEGATIVE_PROMPT = (
    "(worst quality:1.4), (low quality:1.4), lowres, bad anatomy, bad hands, "
    "extra fingers, fewer fingers, extra limbs, malformed limbs, fused fingers, "
    "too many fingers, long neck, cross-eyed, mutated hands, deformed, blurry, "
    "watermark, text, signature, logo distortion, misspelled text, extra people, "
    "cropped, out of frame, duplicate, ugly, disfigured, jpeg artifacts, cartoon, "
    "anime, illustration, painting, drawing, 3d render"
)

QUALITY_PREFIX = (
    "masterpiece, best quality, photorealistic, professional photography, "
    "8k uhd, sharp focus, natural lighting, Canon EOS R5, 85mm lens, "
    "RAW photo, high detail skin texture"
)

# Image definitions: (filename, prompt, width, height, seed, guidance)
IMAGES = [
    (
        "01_equipo_corporativo.jpg",
        f"{QUALITY_PREFIX}, "
        "a group of 4 professional corporate service workers standing together in a modern office lobby, "
        "2 men and 2 women, diverse latin american team, confident poses, "
        "all wearing matching dark navy blue polo shirts, navy blue pants, professional appearance, "
        "friendly smiles, looking at camera, "
        "bright modern corporate office lobby background with glass walls and natural light, "
        "warm professional lighting, team photo composition, corporate group portrait",
        512, 384, 1234567890, 6.5
    ),
    (
        "02_limpieza_empresarial.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional female cleaning worker in a modern corporate office, latin american woman, "
        "wearing dark navy blue polo shirt, navy pants, teal blue rubber gloves, "
        "wiping a glass desk surface with a microfiber cloth, professional cleaning supplies nearby, "
        "modern bright office with floor-to-ceiling windows, natural daylight streaming in, "
        "professional corporate cleaning service, dedicated worker, pleasant expression, "
        "shot from slight angle, professional composition",
        512, 512, 2345678901, 6.5
    ),
    (
        "03_fumigacion.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional pest control worker in a large corporate building hallway, latin american man, "
        "wearing white protective hazmat coverall suit, blue respirator mask, protective goggles, blue rubber gloves, "
        "holding a professional backpack sprayer, spraying fine mist along baseboard, "
        "modern corporate hallway with clean walls and fluorescent lighting, "
        "professional fumigation service, confident pose, safety gear",
        512, 512, 3456789012, 6.5
    ),
    (
        "04_aires_acondicionados.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional male HVAC technician working on a ceiling-mounted air conditioning unit, latin american man, "
        "wearing dark navy blue polo shirt, navy pants, standing on a step ladder, "
        "removing AC filter panel with gloved hands, focused expression, "
        "modern office space with white ceiling tiles and recessed lighting, "
        "professional maintenance service, competent worker, tools on belt",
        512, 512, 4567890123, 6.5
    ),
    (
        "05_plantas_electricas.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional male electrical technician inspecting a large industrial diesel generator, latin american man, "
        "wearing dark navy blue polo shirt, navy pants, white safety helmet, work gloves, "
        "holding a digital multimeter, checking generator control panel with gauges, "
        "industrial mechanical room with concrete floor and ventilation, "
        "professional electrical maintenance, focused and competent expression",
        512, 512, 6789012345, 6.5
    ),
    (
        "06_jardineria.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional male gardener trimming a perfectly manicured green hedge outdoors, latin american man, "
        "wearing dark navy blue polo shirt, navy pants, dark cap, work gloves, "
        "using professional hedge trimmers, neat precise cuts, "
        "modern corporate building exterior in background with glass facade, "
        "lush green landscaping, bright sunny day, corporate garden maintenance",
        512, 512, 5678901234, 6.5
    ),
    (
        "07_outsourcing_personal.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional female office support worker at a modern reception desk, latin american woman, "
        "wearing dark navy blue polo shirt, navy pants, "
        "holding a clipboard and pen, friendly welcoming smile, professional posture, "
        "modern corporate reception area with indoor plants and modern furniture, "
        "professional staffing service, approachable and competent, warm natural lighting",
        512, 512, 7890123456, 6.5
    ),
    (
        "08_supervisor_sst.jpg",
        f"{QUALITY_PREFIX}, "
        "a professional female safety supervisor in a corporate industrial facility, latin american woman, "
        "wearing dark navy blue safety vest over white button-down shirt, white hard hat, holding clipboard, "
        "inspecting workplace safety conditions, serious professional expression, "
        "industrial facility corridor with safety signage visible, "
        "professional occupational safety inspection, authoritative posture, natural lighting",
        512, 512, 8901234567, 6.5
    ),
]


def clear_vram():
    """Aggressively clear VRAM between generations"""
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.synchronize()


def generate_all():
    print("=" * 60)
    print("LEBRONES SERVICES — Image Generator")
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 60)

    # Load pipeline with memory optimizations
    print("\n[1/2] Loading VAE...")
    from diffusers import AutoencoderKL
    vae = AutoencoderKL.from_pretrained(VAE_ID, torch_dtype=torch.float32)

    print("[2/2] Loading Realistic Vision v5.1 pipeline...")
    from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

    pipe = StableDiffusionPipeline.from_pretrained(
        MODEL_ID,
        vae=vae,
        torch_dtype=torch.float32,  # GTX 16XX needs float32 (no native fp16)
        safety_checker=None,
        requires_safety_checker=False,
    )

    # Use DPM++ 2M Karras scheduler
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(
        pipe.scheduler.config,
        use_karras_sigmas=True,
        algorithm_type="dpmsolver++",
    )

    # Memory optimizations for 6GB VRAM
    pipe.enable_attention_slicing(slice_size="auto")
    try:
        pipe.enable_xformers_memory_efficient_attention()
        print("  xformers: ENABLED")
    except Exception:
        print("  xformers: not available, using attention slicing")

    # Move to GPU with sequential CPU offload for 6GB
    pipe.enable_sequential_cpu_offload()
    print("  Sequential CPU offload: ENABLED (saves ~2GB VRAM)")

    print(f"\nGenerating {len(IMAGES)} images...\n")

    for i, (filename, prompt, w, h, seed, cfg) in enumerate(IMAGES, 1):
        outpath = OUTPUT_DIR / filename
        if outpath.exists():
            print(f"  [{i}/{len(IMAGES)}] SKIP (exists): {filename}")
            continue

        print(f"  [{i}/{len(IMAGES)}] Generating: {filename} ({w}x{h}, seed={seed})...")
        clear_vram()

        generator = torch.Generator("cpu").manual_seed(seed)

        try:
            result = pipe(
                prompt=prompt,
                negative_prompt=NEGATIVE_PROMPT,
                width=w,
                height=h,
                num_inference_steps=28,
                guidance_scale=cfg,
                generator=generator,
                clip_skip=2,
            )
            image = result.images[0]
            image.save(outpath, quality=92)
            print(f"           SAVED: {outpath}")
        except Exception as e:
            print(f"           ERROR: {e}")
            clear_vram()

    print("\n" + "=" * 60)
    print("DONE! All images saved to:")
    print(f"  {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    generate_all()
