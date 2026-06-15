# {  "subject": {    "identity": {      "reference_model": ...

**标签**：#角色 #身份 #一致性 #参考
**触发词**：角色一致、身份保持
**适用场景**：IP设计、角色设计
**比例**：576:1024  
**来源**：meigen.ai  
**链接**：https://meigen.ai/prompt/community_bff614f4-70a7-4a67-be1e-724bb546fb02  
**作者**：Tiagdtd  
**模型**：z-image-turbo  
**Prompt来源**：⚠️ 截断（API兜底）

---

## 一句话理解

主体身份参考模型，角色一致性保持

---

## 核心特点

- 构图：Portrait、Face、Scene
- 光影：Blur、Shadow、Highlight
- 色调：Vibrant
- 风格：Render、Editorial、Luxurious、Minimal

---

---

---

## 完整模板

```
{  "subject": {    "identity": {      "reference_model": "Young elegant Asian female model",      "facial_archetype": "High-fidelity recreation of distinctive Asian facial morphology: delicate features, refined nose bridge, almond-shaped luminous eyes with characteristic dark brown iris tone. Dental structure reflects standard aesthetic alignment. Skin: radiant, fair complexion with warm natural undertones, natural epidermal texture and subtle light-diffusing properties.",      "body": {        "somatotype": "Petite, slender, and toned physique consistent with an elegant silhouette. Proportions aligned with the subject's natural height and build. Lower limb morphology and shoulder-to-hip tapering calibrated for anatomical accuracy.",        "posture": "Subject seated on a marble surface with legs flexed, body angled towards a mirror, one hand holding a strawberry toward the facial plane."      }    }  },  "wardrobe": {    "attire": "Vibrant cherry-red knitted cardigan (Hex #E30B25) worn over a white cropped camisole with delicate floral micro-prints. Matching red high-waisted shorts with contrasting white waistband trim. Accessory: single-strand pearl choker necklace (Hex #F5F5F5).",    "hair": "Natural dark brown or black hair, stylized in a voluminous side-swept braid.",    "material_physics": "Subsurface light scattering on skin, soft-touch tactile quality of knitwear, lustrous surface properties of pearl accessories."  },  "pose_action": {    "position": "Seated on a bathroom vanity countertop, one leg raised, torso angled partially toward a large mirror, creating a reflective composition. Subject is actively interacting with the scene by holding a fruit piece.",    "expression": "Soft, composed, slightly whimsical expression."  },  "scene": {    "environment": "Luxurious bathroom interior. Surfaces: polished white marble with gold-toned trim, large vanity mirror with decorative molding. Fixtures: vintage-style brass wall-mounted lamps with fabric shades.",    "atmosphere": "Warm, high-key interior lighting, clean, elegant, and editorial aesthetic.",    "format": "9:16 aspect ratio."  },  "lighting": {    "primary": "Integrated vanity mirror lighting and ambient warm-toned wall sconces (Color temperature: 3200K).",    "effects": "Soft diffuse glow on skin, warm highlights on mirror frame, minimal shadow casting, specular glint on pearl and marble surfaces.",    "reflection_integrity": "Mirror reflection must accurately render the subject's backside and environment, maintaining spatial consistency with the primary view."  },  "camera": {    "specifications": "Equivalent 35mm focal length, f/2.2 aperture, high-speed shutter for crisp detail, professional portrait-grade depth of field.",    "negative_constraints": "No logos, no text, no watermarks, no synthetic smoothing, no over-processed skin, no anatomical errors, no extra limbs, no distortion, no blurry artifacts."  }}
```

---

## 风格锚点（必须保持）

- 基于完整 prompt 的视觉风格
- 专业的构图和光影

---

## 🚫 避免风格

- 低质量渲染
- 模糊或失真的细节

---


---

## 使用记录

| 日期 | 用户 | 场景 | 效果 | 备注 |
|------|------|------|------|------|
| - | - | - | - | - |

**评分标准**：
- ⭐⭐⭐⭐⭐ 优秀
- ⭐⭐⭐⭐ 良好
- ⭐⭐⭐ 一般
- ⭐⭐ 较差
- ⭐ 不推荐

**维度说明**：
- 稳定性：重复生成一致性
- 美观度：视觉效果
- 实用性：套用难易度

## 参考配图

![style](https://malongan.github.io/images/meigen_fix_120036.png)
