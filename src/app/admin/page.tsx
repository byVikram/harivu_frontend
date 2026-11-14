"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { Product, ProductVariant } from "@/lib/types";
import {
  fetchAdminDashboard,
  fetchBatches,
  createBatch,
  updateBatch,
  fetchOfflineSales,
  createOfflineSale,
  updateProductStock,
  createAdminProduct,
  createAdminVariant,
  fetchAdminOrders,
  updateAdminOrderStatus,
  updateAdminProduct,
  fetchOfficeInventory,
  fetchOfficeInventoryHistory,
  createOfficeInventoryItem,
  updateOfficeInventoryItem,
  updateOfficeInventoryCount,
  adjustOfficeInventoryCount,
  deleteOfficeInventoryItem,
  uploadAdminImage,
  OfficeInventoryItem,
  OfficeInventoryHistoryEntry,
  OfficeCategoryStat,
  SeedingBatch,
  OfflineSale,
  AdminDashboardData,
} from "@/lib/adminApi";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Logo } from "@/components/ui/Logo";
import { Dropdown } from "@/components/ui/Dropdown";
import { BarGraph } from "@/components/ui/BarGraph";
import { ImageUpload } from "@/components/ui/ImageUpload";
import {
  Sprout,
  LayoutDashboard,
  Calendar,
  Package,
  Receipt,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Scissors,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Search,
  Pencil,
  Trash2,
  Video,
  Star,
  Sparkles,
  Check,
  X,
  ExternalLink,
  Layers,
  Eye,
  Boxes,
  MapPin,
  Tag,
  Wrench,
  FolderPlus,
  History,
  Grid,
  List,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart2,
  Upload,
} from "lucide-react";

type AdminTab = "overview" | "seeding" | "products" | "assets" | "offline" | "orders";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [batches, setBatches] = useState<SeedingBatch[]>([]);
  const [offlineSales, setOfflineSales] = useState<OfflineSale[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Check persisted session or auto-unlock
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("harivu_admin_auth", "true");
      localStorage.setItem("harivu_admin_auth", "true");
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("harivu_admin_auth", "true");
      localStorage.setItem("harivu_admin_auth", "true");
    }
    setIsAuthenticated(true);
    setAuthError(false);
  };

  const handleQuickUnlock = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("harivu_admin_auth", "true");
      localStorage.setItem("harivu_admin_auth", "true");
    }
    setIsAuthenticated(true);
    setAuthError(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("harivu_admin_auth");
      localStorage.removeItem("harivu_admin_auth");
    }
    setIsAuthenticated(false);
  };

  // Notifications
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Forms states
  const [batchForm, setBatchForm] = useState({
    product_id: "",
    seeded_date: new Date().toISOString().split("T")[0],
    trays_planted: 2,
    expected_yield_packs: 10,
    seed_lot_notes: "",
    notes: "",
  });

  const [offlineForm, setOfflineForm] = useState({
    product_id: "",
    variant_id: "",
    product_name: "",
    variant_name: "50g Pack",
    quantity: 1,
    unit_price: 80,
    payment_method: "upi",
    channel: "direct",
    customer_name: "",
    customer_phone: "",
    notes: "",
  });

  const [newProductForm, setNewProductForm] = useState({
    name: "",
    slug: "",
    category: "Spicy & Peppery",
    short_description: "",
    description: "",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    price: 80,
    growing_days: 10,
    stock_quantity: 50,
    flavor_profile: "",
  });

  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [newBenefitInput, setNewBenefitInput] = useState("");
  const [newUseInput, setNewUseInput] = useState("");
  const [editProductForm, setEditProductForm] = useState({
    id: "",
    name: "",
    slug: "",
    category: "Microgreens",
    short_description: "",
    description: "",
    image_url: "",
    video_url: "",
    price: 80,
    unit: "50g pack",
    growing_days: 10,
    stock_quantity: 50,
    is_available: true,
    is_featured: false,
    flavor_profile: "",
    harvest_notes: "",
    display_order: 1,
    benefits: [] as string[],
    uses: [] as string[],
    variants: [] as ProductVariant[],
  });

  // Office Products & Equipment Inventory State
  const [officeInventory, setOfficeInventory] = useState<OfficeInventoryItem[]>([]);
  const [officeCategories, setOfficeCategories] = useState<string[]>([
    "Storage & Crates",
    "Furniture & Seating",
    "Grow Equipment",
    "Office & Packing"
  ]);
  const [selectedInventoryCategory, setSelectedInventoryCategory] = useState<string>("All");
  const [inventorySearchQuery, setInventorySearchQuery] = useState<string>("");

  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [inventoryForm, setInventoryForm] = useState({
    name: "",
    category: "Storage & Crates",
    quantity: 10,
    unit: "crates",
    location: "Packhouse Rack 1",
    condition: "Good",
    image_url: "",
    notes: "",
  });

  const [editingInventoryItem, setEditingInventoryItem] = useState<OfficeInventoryItem | null>(null);
  const [isEditCreatingNewCategory, setIsEditCreatingNewCategory] = useState(false);
  const [editCustomCategoryInput, setEditCustomCategoryInput] = useState("");
  const [editInventoryForm, setEditInventoryForm] = useState({
    id: "",
    name: "",
    category: "Storage & Crates",
    quantity: 10,
    unit: "crates",
    location: "",
    condition: "Good",
    image_url: "",
    notes: "",
  });

  const [showQuickCategoryModal, setShowQuickCategoryModal] = useState(false);
  const [quickNewCategory, setQuickNewCategory] = useState("");

  // Office Inventory History Views State
  const [inventoryHistory, setInventoryHistory] = useState<OfficeInventoryHistoryEntry[]>([]);
  const [inventoryViewMode, setInventoryViewMode] = useState<"cards" | "history">("cards");
  const [historyFilterType, setHistoryFilterType] = useState<string>("All");

  // Adjustment Modal State
  const [adjustingItem, setAdjustingItem] = useState<OfficeInventoryItem | null>(null);
  const [adjustForm, setAdjustForm] = useState({
    quantity: 0,
    change_type: "restock",
    dateChoice: "today" as "today" | "yesterday" | "custom",
    customDate: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const [isSubmittingAdjustment, setIsSubmittingAdjustment] = useState(false);

  // Item Specific History Timeline Modal State
  const [selectedItemForHistory, setSelectedItemForHistory] = useState<OfficeInventoryItem | null>(null);
  const [itemHistoryList, setItemHistoryList] = useState<OfficeInventoryHistoryEntry[]>([]);
  const [loadingItemHistory, setLoadingItemHistory] = useState(false);

  // Load all initial admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, dash, batchList, salesList, orderList, officeData, officeHistData] = await Promise.all([
        fetchProducts(),
        fetchAdminDashboard(),
        fetchBatches(),
        fetchOfflineSales(),
        fetchAdminOrders(),
        fetchOfficeInventory(),
        fetchOfficeInventoryHistory(),
      ]);

      setProducts(prods);
      setDashboard(dash);
      setBatches(batchList);
      setOfflineSales(salesList);
      setOrders(orderList);
      setOfficeInventory(officeData.items);
      setInventoryHistory(officeHistData.history || []);
      if (officeData.categories && officeData.categories.length > 0) {
        setOfficeCategories((prev) => {
          return Array.from(new Set([...prev, ...officeData.categories]));
        });
      }

      if (prods.length > 0 && !batchForm.product_id) {
        setBatchForm((prev) => ({ ...prev, product_id: prods[0].id }));
        setOfflineForm((prev) => ({
          ...prev,
          product_id: prods[0].id,
          product_name: prods[0].name,
          variant_name: prods[0].variants?.[0]?.name || "50g Pack",
          unit_price: prods[0].variants?.[0]?.price || prods[0].price,
        }));
      }
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  // 1. Create Seeding Batch
  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchForm.product_id) {
      showToast("Please select a microgreen variety", "error");
      return;
    }

    const res = await createBatch(batchForm);
    if (res.success) {
      showToast("Seeding batch recorded! Estimated harvest date calculated.");
      setShowAddBatchModal(false);
      loadData();
    } else {
      showToast(res.message || "Failed to record batch", "error");
    }
  };

  // 2. Update Batch Status (e.g. mark as Harvested)
  const handleUpdateBatchStatus = async (batchId: string, newStatus: string) => {
    const res = await updateBatch(batchId, { status: newStatus });
    if (res.success) {
      showToast(`Batch status updated to ${newStatus.replace(/_/g, " ")}. Inventory adjusted!`);
      loadData();
    } else {
      showToast(res.message || "Failed to update batch", "error");
    }
  };

  // 3. Log Offline Direct Sale
  const handleCreateOfflineSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineForm.product_id) {
      showToast("Please select a product", "error");
      return;
    }

    const res = await createOfflineSale(offlineForm);
    if (res.success) {
      showToast(`Offline sale logged (${res.data?.receipt_number}). Stock auto-deducted!`);
      setShowAddSaleModal(false);
      loadData();
    } else {
      showToast(res.message || "Failed to log sale", "error");
    }
  };

  // 4. Update Stock Quantity
  const handleAdjustStock = async (productId: string, delta: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stock_quantity || 0) + delta);

    const res = await updateProductStock(productId, newStock);
    if (res.success) {
      showToast(`Stock for ${prod.name} updated to ${newStock}`);
      loadData();
    } else {
      showToast(res.message || "Failed to adjust stock", "error");
    }
  };

  // 5. Create New Product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newProductForm.slug || newProductForm.name.toLowerCase().replace(/\s+/g, "-");
    const res = await createAdminProduct({ ...newProductForm, slug });
    if (res.success) {
      showToast(`Variety ${newProductForm.name} added to catalogue!`);
      setShowAddProductModal(false);
      loadData();
    } else {
      showToast(res.message || "Failed to add product", "error");
    }
  };

  // 5.05 Quick Product Image Upload Handler
  const handleQuickProductImageUpload = async (prod: Product, file: File) => {
    try {
      showToast(`Uploading photo for ${prod.name}...`);
      const res = await uploadAdminImage(file);
      if (res.success && res.url) {
        const updateRes = await updateAdminProduct(prod.id, {
          ...prod,
          image_url: res.url,
        });
        if (updateRes.success) {
          showToast(`Photo for ${prod.name} updated!`);
          loadData();
        } else {
          showToast(updateRes.message || "Failed to save product image", "error");
        }
      } else {
        showToast(res.message || "Image upload failed", "error");
      }
    } catch (err) {
      console.error("Quick image upload error:", err);
      showToast("Error uploading product image", "error");
    }
  };

  // 5.1 Edit Product Handlers
  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    const initialVariants =
      product.variants && product.variants.length > 0
        ? product.variants.map((v) => ({ ...v }))
        : [
            {
              id: `new-${Date.now()}-1`,
              product_id: product.id,
              name: "50g Regular Pack",
              weight_grams: 50,
              price: product.price ?? 80,
              is_available: true,
              is_default: true,
            },
            {
              id: `new-${Date.now()}-2`,
              product_id: product.id,
              name: "100g Family Pack",
              weight_grams: 100,
              price: Math.round((product.price ?? 80) * 1.85),
              is_available: true,
              is_default: false,
            },
            {
              id: `new-${Date.now()}-3`,
              product_id: product.id,
              name: "200g Chef Tray",
              weight_grams: 200,
              price: Math.round((product.price ?? 80) * 3.5),
              is_available: true,
              is_default: false,
            },
          ];

    setEditProductForm({
      id: product.id,
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "Microgreens",
      short_description: product.short_description || "",
      description: product.description || "",
      image_url: product.image_url || "",
      video_url: product.video_url || "",
      price: product.price ?? 80,
      unit: product.unit || "50g pack",
      growing_days: product.growing_days ?? 10,
      stock_quantity: product.stock_quantity ?? 50,
      is_available: product.is_available ?? true,
      is_featured: product.is_featured ?? false,
      flavor_profile: product.flavor_profile || "",
      harvest_notes: product.harvest_notes || "",
      display_order: product.display_order ?? 1,
      benefits: product.benefits && Array.isArray(product.benefits) ? [...product.benefits] : [],
      uses: product.uses && Array.isArray(product.uses) ? [...product.uses] : [],
      variants: initialVariants,
    });
    setNewBenefitInput("");
    setNewUseInput("");
  };

  const handleVariantFieldChange = (index: number, field: keyof ProductVariant, value: any) => {
    setEditProductForm((prev) => {
      const updated = [...prev.variants];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      // If marking as default, uncheck default on other variants and update base price
      if (field === "is_default" && value === true) {
        updated.forEach((v, i) => {
          if (i !== index) v.is_default = false;
        });
        return { ...prev, variants: updated, price: updated[index].price };
      }
      return { ...prev, variants: updated };
    });
  };

  const handleAddNewVariant = () => {
    setEditProductForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: `new-${Date.now()}`,
          product_id: prev.id,
          name: "100g Pack",
          weight_grams: 100,
          price: Math.round(prev.price * 1.8),
          is_available: true,
          is_default: false,
        },
      ],
    }));
  };

  const handleRemoveVariantRow = (index: number) => {
    setEditProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleAddBenefit = () => {
    const trimmed = newBenefitInput.trim();
    if (!trimmed) return;
    if (!editProductForm.benefits.includes(trimmed)) {
      setEditProductForm((prev) => ({
        ...prev,
        benefits: [...prev.benefits, trimmed],
      }));
    }
    setNewBenefitInput("");
  };

  const handleRemoveBenefit = (index: number) => {
    setEditProductForm((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleAddUse = () => {
    const trimmed = newUseInput.trim();
    if (!trimmed) return;
    if (!editProductForm.uses.includes(trimmed)) {
      setEditProductForm((prev) => ({
        ...prev,
        uses: [...prev.uses, trimmed],
      }));
    }
    setNewUseInput("");
  };

  const handleRemoveUse = (index: number) => {
    setEditProductForm((prev) => ({
      ...prev,
      uses: prev.uses.filter((_, i) => i !== index),
    }));
  };

  const handleSaveEditedProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductForm.id) return;
    setIsSavingProduct(true);
    try {
      const payload = {
        name: editProductForm.name,
        slug: editProductForm.slug || editProductForm.name.toLowerCase().replace(/\s+/g, "-"),
        category: editProductForm.category,
        short_description: editProductForm.short_description,
        description: editProductForm.description,
        image_url: editProductForm.image_url,
        video_url: editProductForm.video_url || null,
        price: Number(editProductForm.price),
        unit: editProductForm.unit,
        growing_days: Number(editProductForm.growing_days),
        stock_quantity: Number(editProductForm.stock_quantity),
        is_available: Boolean(editProductForm.is_available),
        is_featured: Boolean(editProductForm.is_featured),
        flavor_profile: editProductForm.flavor_profile || null,
        harvest_notes: editProductForm.harvest_notes || null,
        display_order: Number(editProductForm.display_order),
        benefits: editProductForm.benefits,
        uses: editProductForm.uses,
        variants: editProductForm.variants.map((v) => ({
          id: v.id,
          name: v.name,
          weight_grams: Number(v.weight_grams),
          price: Number(v.price),
          is_available: Boolean(v.is_available),
          is_default: Boolean(v.is_default),
        })),
      };

      const res = await updateAdminProduct(editProductForm.id, payload);
      if (res.success) {
        showToast(`Product "${editProductForm.name}" updated successfully!`);
        setEditingProduct(null);
        await loadData();
      } else {
        showToast(res.message || "Failed to update product", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error updating product", "error");
    } finally {
      setIsSavingProduct(false);
    }
  };

  // 6. Update Customer Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const res = await updateAdminOrderStatus(orderId, newStatus);
    if (res.success) {
      showToast(`Order status updated to ${newStatus}`);
      loadData();
    } else {
      showToast(res.message || "Failed to update order", "error");
    }
  };

  // 7. Office & Asset Inventory Handlers
  const handleQuickAddCategory = (customName?: string) => {
    const catName = (customName || quickNewCategory).trim();
    if (!catName) {
      showToast("Please enter a category name", "error");
      return;
    }
    if (!officeCategories.includes(catName)) {
      setOfficeCategories((prev) => [...prev, catName]);
    }
    setSelectedInventoryCategory(catName);
    setQuickNewCategory("");
    setShowQuickCategoryModal(false);
    showToast(`Category "${catName}" added!`);
  };

  const handleCreateInventoryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = isCreatingNewCategory
      ? customCategoryInput.trim()
      : inventoryForm.category;

    if (!inventoryForm.name.trim()) {
      showToast("Please enter an item name (e.g. Harvest Crates, Office Chairs)", "error");
      return;
    }

    if (!finalCategory) {
      showToast("Please select or specify a category", "error");
      return;
    }

    try {
      const payload = {
        name: inventoryForm.name.trim(),
        category: finalCategory,
        quantity: Math.max(0, Number(inventoryForm.quantity) || 0),
        unit: inventoryForm.unit.trim() || "units",
        location: inventoryForm.location.trim() || undefined,
        condition: inventoryForm.condition.trim() || "Good",
        image_url: inventoryForm.image_url ? inventoryForm.image_url.trim() : undefined,
        notes: inventoryForm.notes.trim() || undefined,
      };

      const res = await createOfficeInventoryItem(payload);
      if (res.success) {
        showToast(`Added "${payload.name}" to inventory (${payload.quantity} ${payload.unit})!`);
        if (!officeCategories.includes(finalCategory)) {
          setOfficeCategories((prev) => [...prev, finalCategory]);
        }
        setShowAddInventoryModal(false);
        setIsCreatingNewCategory(false);
        setCustomCategoryInput("");
        setInventoryForm({
          name: "",
          category: finalCategory,
          quantity: 10,
          unit: "units",
          location: "",
          condition: "Good",
          image_url: "",
          notes: "",
        });
        await loadData();
      } else {
        showToast(res.message || "Failed to create inventory item", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error creating inventory item", "error");
    }
  };

  const openEditInventoryModal = (item: OfficeInventoryItem) => {
    setEditingInventoryItem(item);
    setEditInventoryForm({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location || "",
      condition: item.condition || "Good",
      image_url: item.image_url || "",
      notes: item.notes || "",
    });
    setIsEditCreatingNewCategory(false);
    setEditCustomCategoryInput("");
  };

  const handleUpdateInventoryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInventoryForm.id) return;

    const finalCategory = isEditCreatingNewCategory
      ? editCustomCategoryInput.trim()
      : editInventoryForm.category;

    if (!editInventoryForm.name.trim()) {
      showToast("Please enter an item name", "error");
      return;
    }

    if (!finalCategory) {
      showToast("Please select or specify a category", "error");
      return;
    }

    try {
      const payload = {
        name: editInventoryForm.name.trim(),
        category: finalCategory,
        quantity: Math.max(0, Number(editInventoryForm.quantity) || 0),
        unit: editInventoryForm.unit.trim() || "units",
        location: editInventoryForm.location.trim() || undefined,
        condition: editInventoryForm.condition.trim() || "Good",
        image_url: editInventoryForm.image_url ? editInventoryForm.image_url.trim() : null,
        notes: editInventoryForm.notes.trim() || undefined,
      };

      const res = await updateOfficeInventoryItem(editInventoryForm.id, payload);
      if (res.success) {
        showToast(`Updated "${payload.name}" in inventory!`);
        if (!officeCategories.includes(finalCategory)) {
          setOfficeCategories((prev) => [...prev, finalCategory]);
        }
        setEditingInventoryItem(null);
        await loadData();
      } else {
        showToast(res.message || "Failed to update inventory item", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error updating inventory item", "error");
    }
  };

  const handleAdjustInventoryCount = async (item: OfficeInventoryItem, delta: number) => {
    const newCount = Math.max(0, item.quantity + delta);
    if (newCount === item.quantity) return;

    const changeType = delta > 0 ? "restock" : "usage";
    const noteText = `Quick stepper adjustment (${delta > 0 ? `+${delta}` : delta} ${item.unit})`;
    const nowIso = new Date().toISOString();

    // Optimistic update
    setOfficeInventory((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              quantity: newCount,
              last_previous_quantity: item.quantity,
              last_change_amount: delta,
              last_change_type: changeType,
              last_notes: noteText,
              last_recorded_at: nowIso,
            }
          : i
      )
    );

    const res = await adjustOfficeInventoryCount(item.id, {
      quantity: newCount,
      change_type: changeType,
      notes: noteText,
      recorded_at: nowIso,
    });

    if (res.success) {
      showToast(`Count updated: ${item.name} is now ${newCount} ${item.unit}`);
      if (res.history) {
        setInventoryHistory((prev) => [res.history!, ...prev]);
      }
    } else {
      // Revert if failed
      setOfficeInventory((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i))
      );
      showToast(res.message || "Failed to update count", "error");
    }
  };

  const openAdjustModal = (item: OfficeInventoryItem) => {
    setAdjustingItem(item);
    setAdjustForm({
      quantity: item.quantity,
      change_type: "restock",
      dateChoice: "today",
      customDate: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  const handleConfirmAdjustCount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingItem) return;

    setIsSubmittingAdjustment(true);
    try {
      let recordedAtIso = new Date().toISOString();
      if (adjustForm.dateChoice === "yesterday") {
        const yDate = new Date(Date.now() - 86400000);
        recordedAtIso = yDate.toISOString();
      } else if (adjustForm.dateChoice === "custom" && adjustForm.customDate) {
        recordedAtIso = new Date(adjustForm.customDate).toISOString();
      }

      const diff = adjustForm.quantity - adjustingItem.quantity;
      let effectiveType = adjustForm.change_type;
      if (!effectiveType || effectiveType === "adjustment") {
        effectiveType = diff > 0 ? "restock" : diff < 0 ? "usage" : "audit";
      }

      const res = await adjustOfficeInventoryCount(adjustingItem.id, {
        quantity: adjustForm.quantity,
        change_type: effectiveType,
        notes: adjustForm.notes || undefined,
        recorded_at: recordedAtIso,
      });

      if (res.success && res.data) {
        showToast(`Stock updated: ${adjustingItem.name} is now ${res.data.quantity} ${adjustingItem.unit}`);
        setOfficeInventory((prev) =>
          prev.map((i) => (i.id === adjustingItem.id ? res.data! : i))
        );
        if (res.history) {
          setInventoryHistory((prev) => [res.history!, ...prev]);
        }
        setAdjustingItem(null);
      } else {
        showToast(res.message || "Failed to adjust count", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error updating count", "error");
    } finally {
      setIsSubmittingAdjustment(false);
    }
  };

  const openItemHistoryModal = async (item: OfficeInventoryItem) => {
    setSelectedItemForHistory(item);
    setLoadingItemHistory(true);
    try {
      const res = await fetchOfficeInventoryHistory(item.id);
      setItemHistoryList(res.history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingItemHistory(false);
    }
  };

  const formatHistoryDate = (isoStr?: string | null) => {
    if (!isoStr) return "—";
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffDays = Math.round((nowDay.getTime() - dDay.getTime()) / (1000 * 60 * 60 * 24));

      const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });

      if (diffDays === 0) {
        return `Today, ${timeStr}`;
      } else if (diffDays === 1) {
        return `Yesterday, ${timeStr}`;
      } else if (diffDays > 1 && diffDays < 7) {
        return `${diffDays} days ago (${d.toLocaleDateString([], { month: "short", day: "numeric" })})`;
      } else {
        return `${d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} at ${timeStr}`;
      }
    } catch {
      return isoStr;
    }
  };

  const handleDeleteInventoryItem = async (item: OfficeInventoryItem) => {
    if (!window.confirm(`Are you sure you want to remove "${item.name}" (${item.quantity} ${item.unit}) from inventory?`)) {
      return;
    }

    const res = await deleteOfficeInventoryItem(item.id);
    if (res.success) {
      showToast(`Removed "${item.name}" from inventory.`);
      setOfficeInventory((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      showToast(res.message || "Failed to delete item", "error");
    }
  };

  // Helper for batch estimated harvest preview in modal
  const selectedProduct = products.find((p) => p.id === batchForm.product_id);
  const estimatedHarvestDatePreview = (() => {
    try {
      const seeded = new Date(batchForm.seeded_date);
      const days = selectedProduct?.growing_days || 10;
      seeded.setDate(seeded.getDate() + days);
      return seeded.toISOString().split("T")[0];
    } catch {
      return "—";
    }
  })();

  // Filtered inventory items and totals
  const filteredOfficeInventory = officeInventory.filter((item) => {
    const matchesCategory =
      selectedInventoryCategory === "All" || item.category === selectedInventoryCategory;
    const q = inventorySearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.condition && item.condition.toLowerCase().includes(q)) ||
      (item.notes && item.notes.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const filteredHistory = inventoryHistory.filter((hist) => {
    const matchesCategory =
      selectedInventoryCategory === "All" || hist.category === selectedInventoryCategory;
    const matchesType =
      historyFilterType === "All" || hist.change_type === historyFilterType;
    const q = inventorySearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      hist.item_name.toLowerCase().includes(q) ||
      hist.category.toLowerCase().includes(q) ||
      (hist.notes && hist.notes.toLowerCase().includes(q));
    return matchesCategory && matchesType && matchesSearch;
  });

  const totalOfficeUnits = officeInventory.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  const totalOfficeCategoriesCount = Array.from(new Set(officeInventory.map((i) => i.category))).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-natural-warmWhite flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-natural-border shadow-elevated space-y-6 text-center">
          <div className="flex justify-center pb-2">
            <Logo size="lg" />
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-natural-text">
              Admin Command Hub
            </h1>
            <p className="text-xs text-natural-muted">
              Enter your manager passcode to access crop lifecycle and sales tools.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Incorrect passcode. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <Input
              label="Manager Passcode (Optional in Dev)"
              type="text"
              placeholder="e.g. harivu2026 or click Enter"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setAuthError(false);
              }}
              helperText="Press Enter or click the button below to access directly"
            />

            <Button type="submit" variant="primary" size="lg" className="w-full shadow-md">
              Enter Admin Command Hub
            </Button>

            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2.5 px-4 bg-brand-50 hover:bg-brand-100 text-brand-900 text-xs font-semibold rounded-xl transition-all border border-brand-200"
            >
              ⚡ 1-Click Access (Direct Unlock)
            </button>
          </form>

          <div className="pt-2 border-t border-natural-border/70 flex flex-col gap-2">
            <a
              href="/admin?key=harivu2026"
              className="text-xs text-brand-800 font-medium hover:underline bg-stone-100 py-1.5 px-3 rounded-lg"
            >
              Direct Link: /admin?key=harivu2026
            </a>
            <Link href="/" className="text-xs text-brand-900 font-semibold hover:underline">
              ← Return to Harivu Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural-surface/50 text-natural-text pb-20">
      {/* Toast Feedback Alert */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-elevated border flex items-center gap-3 animate-scale-in ${
            feedback.type === "success"
              ? "bg-brand-900 text-white border-brand-800"
              : "bg-red-600 text-white border-red-700"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-brand-300 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white shrink-0" />
          )}
          <span className="text-sm font-medium">{feedback.message}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-brand-950 text-natural-warmWhite border-b border-brand-900 px-3 sm:px-8 py-2.5 sm:py-4 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Logo variant="light" size="sm" showTagline={false} linkToHome={false} />
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest bg-brand-800 text-brand-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-brand-700 shrink-0">
                Admin Hub
              </span>
            </div>

            {/* Mobile-only quick actions */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={loadData}
                disabled={loading}
                className="p-1.5 rounded-lg bg-brand-900 text-brand-200 hover:text-white hover:bg-brand-800 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={handleLogout}
                className="text-[11px] text-red-300 hover:text-red-100 font-semibold px-2 py-1 rounded-lg border border-red-900/80 bg-red-950/40"
              >
                Exit
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-nowrap">
            <button
              onClick={loadData}
              disabled={loading}
              className="hidden md:flex p-2 rounded-xl bg-brand-900 text-brand-200 hover:text-white hover:bg-brand-800 transition-colors shrink-0"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={() => setShowAddBatchModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-100 text-brand-950 hover:bg-brand-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-xs shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Seeding</span>
            </button>

            <button
              onClick={() => setShowAddSaleModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-xs shrink-0 whitespace-nowrap"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Log Direct Sale</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="text-xs text-brand-300 hover:text-white underline px-1.5 shrink-0 whitespace-nowrap"
            >
              Storefront →
            </Link>

            <button
              onClick={handleLogout}
              className="hidden md:inline-flex text-xs text-red-300 hover:text-red-100 font-semibold px-2.5 py-1.5 rounded-lg border border-red-900/80 bg-red-950/40 shrink-0"
              title="Lock Admin Hub"
            >
              Lock / Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 pt-3 sm:pt-6">
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-natural-border pb-1 overflow-x-auto scrollbar-none flex-nowrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("seeding")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "seeding"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Seeding & Harvest</span>
            <span className="text-[10px] sm:text-xs bg-brand-100 text-brand-900 px-1.5 py-0.2 rounded-full font-bold">
              {batches.filter((b) => b.status !== "harvested").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "products"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Products & Stock</span>
            <span className="text-[10px] sm:text-xs bg-natural-surface text-natural-text px-1.5 py-0.2 rounded-full font-bold">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("assets")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "assets"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <Boxes className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Office & Supplies</span>
          </button>

          <button
            onClick={() => setActiveTab("offline")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "offline"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Direct Sales</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-white text-brand-900 border-t border-x border-natural-border shadow-xs"
                : "text-natural-muted hover:text-natural-text"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Online Orders</span>
            <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
              {orders.filter((o) => o.status === "pending").length}
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="pt-6 space-y-8 animate-scale-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Active Seeding Batches
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-900">
                    <Sprout className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-brand-950">
                    {dashboard?.activeBatchesCount || 0}
                  </span>
                  <span className="text-xs text-natural-muted block mt-1">
                    {dashboard?.totalTraysGrowing || 0} trays currently growing
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Ready for Harvest
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                    <Scissors className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-emerald-700">
                    {dashboard?.readyForHarvestCount || 0}
                  </span>
                  <span className="text-xs text-natural-muted block mt-1">
                    Batches at peak cotyledon stage
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Pending Bookings
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-amber-700">
                    {dashboard?.pendingOrdersCount || 0}
                  </span>
                  <span className="text-xs text-natural-muted block mt-1">
                    Awaiting harvest dispatch
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Total Revenue
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-800">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-brand-950">
                    {formatCurrency(dashboard?.totalRevenue || 0)}
                  </span>
                  <span className="text-xs text-natural-muted block mt-1">
                    Online: {formatCurrency(dashboard?.onlineRevenue || 0)} • Offline: {formatCurrency(dashboard?.offlineRevenue || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Office & Farm Inventory Quick Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle border border-indigo-900">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-800/80 flex items-center justify-center shrink-0 border border-indigo-700">
                  <Boxes className="w-5 h-5 text-indigo-200" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Office & Farm Inventory: <span className="text-indigo-300 font-extrabold">{totalOfficeUnits} Total Units</span> in {officeInventory.length} tracked items ({totalOfficeCategoriesCount} categories)
                  </h4>
                  <p className="text-xs text-indigo-200/80">
                    Live counts for harvest crates, chairs, tables, microgreen trays, and equipment.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("assets");
                    setShowAddInventoryModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-indigo-100 text-xs font-semibold transition-colors flex items-center gap-1 border border-indigo-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Quick Add</span>
                </button>
                <button
                  onClick={() => setActiveTab("assets")}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-100 text-indigo-950 hover:bg-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                >
                  <span>Manage Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Harvest Today List & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Ready Today Batches */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-5">
                <div className="flex items-center justify-between border-b border-natural-border pb-4">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-emerald-700" />
                    <h2 className="font-serif text-lg font-bold text-natural-text">
                      Harvest Schedule & Ready Batches
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("seeding")}
                    className="text-xs text-brand-900 font-semibold hover:underline"
                  >
                    View All Batches →
                  </button>
                </div>

                {batches.filter((b) => b.status !== "harvested").length === 0 ? (
                  <p className="text-sm text-natural-muted py-6 text-center">
                    No active batches. Click &ldquo;Record Seeding&rdquo; to start a planting cycle.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {batches
                      .filter((b) => b.status !== "harvested")
                      .slice(0, 5)
                      .map((batch) => {
                        const isReady =
                          batch.status === "ready_to_harvest" || (batch.days_until_harvest || 0) <= 0;

                        return (
                          <div
                            key={batch.id}
                            className="p-4 rounded-2xl border border-natural-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-natural-surface/30"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-natural-text">
                                  {batch.product_name}
                                </span>
                                <span className="text-[11px] font-mono text-natural-muted bg-white px-2 py-0.5 rounded-md border">
                                  {batch.batch_number}
                                </span>
                              </div>
                              <p className="text-xs text-natural-muted mt-1">
                                Planted: {batch.seeded_date} • {batch.trays_planted} Trays (Yield: ~{batch.expected_yield_packs} packs)
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                                  isReady
                                    ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                                    : "bg-brand-50 text-brand-900 border border-brand-100"
                                }`}
                              >
                                {isReady ? "Ready to Harvest" : `${batch.days_until_harvest} Days Left`}
                              </span>

                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleUpdateBatchStatus(batch.id, "harvested")}
                              >
                                Harvest & Restock
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Recent Orders and Offline Sales */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-5">
                <div className="flex items-center justify-between border-b border-natural-border pb-4">
                  <h3 className="font-serif text-lg font-bold text-natural-text">
                    Recent Direct & Offline Sales
                  </h3>
                  <button
                    onClick={() => setActiveTab("offline")}
                    className="text-xs text-brand-900 font-semibold hover:underline"
                  >
                    View All ({offlineSales.length})
                  </button>
                </div>

                {offlineSales.length === 0 ? (
                  <p className="text-sm text-natural-muted py-6 text-center">
                    No offline sales recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {offlineSales.slice(0, 5).map((sale) => (
                      <div
                        key={sale.id}
                        className="p-3.5 rounded-2xl bg-natural-cream/60 border border-natural-border/70 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-natural-text">
                            {sale.product_name} ({sale.variant_name})
                          </p>
                          <p className="text-natural-muted">
                            Qty: {sale.quantity} • {sale.channel.replace(/_/g, " ")} • {sale.customer_name || "Walk-in"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-brand-950 block text-sm">
                            {formatCurrency(sale.total_amount)}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {sale.payment_method}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SEEDING BATCHES & HARVEST CYCLES */}
        {/* ========================================================= */}
        {activeTab === "seeding" && (
          <div className="pt-6 space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-natural-border shadow-subtle">
              <div>
                <h2 className="font-serif text-2xl font-bold text-natural-text">
                  Seeding Batches & Crop Lifecycle
                </h2>
                <p className="text-xs text-natural-muted mt-1">
                  Track microgreens from planting to harvest. Estimated harvest dates are computed automatically from crop growth cycles.
                </p>
              </div>

              <Button size="md" variant="primary" onClick={() => setShowAddBatchModal(true)}>
                <Plus className="w-4 h-4 mr-1.5" />
                <span>New Seeding Batch</span>
              </Button>
            </div>

            {/* Mobile Batches Card View (phones & small screens) */}
            <div className="space-y-3.5 md:hidden">
              {batches.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-natural-border text-center text-xs text-natural-muted">
                  No seeding batches recorded yet.
                </div>
              ) : (
                batches.map((batch) => {
                  const isReady =
                    batch.status === "ready_to_harvest" || (batch.days_until_harvest || 0) <= 0;

                  return (
                    <div
                      key={batch.id}
                      className="p-4 rounded-2xl bg-white border border-natural-border shadow-subtle space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-brand-950 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                          {batch.batch_number}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            batch.status === "harvested"
                              ? "bg-stone-100 text-stone-700"
                              : isReady
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-brand-100 text-brand-900"
                          }`}
                        >
                          {batch.status.replace(/_/g, " ")}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-natural-text">{batch.product_name}</h4>
                        <p className="text-xs text-natural-muted mt-0.5">
                          Planted: <span className="text-natural-text font-medium">{batch.seeded_date}</span> • Harvest:{" "}
                          <span className="text-natural-text font-medium">{batch.estimated_harvest_date}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-natural-surface/60 p-2.5 rounded-xl border border-natural-border/60">
                        <div>
                          <span className="text-natural-muted block text-[10px] uppercase font-bold">Trays</span>
                          <span className="font-bold text-natural-text">{batch.trays_planted} Trays</span>
                        </div>
                        <div className="text-right">
                          <span className="text-natural-muted block text-[10px] uppercase font-bold">Expected Yield</span>
                          <span className="font-bold text-natural-text">~{batch.expected_yield_packs} packs</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <select
                          value={batch.status}
                          onChange={(e) => handleUpdateBatchStatus(batch.id, e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                        >
                          <option value="germinating">Germinating</option>
                          <option value="growing">Growing</option>
                          <option value="ready_to_harvest">Ready to Harvest</option>
                          <option value="harvested">Harvested</option>
                          <option value="discarded">Discarded</option>
                        </select>

                        {batch.status !== "harvested" && (
                          <button
                            onClick={() => handleUpdateBatchStatus(batch.id, "harvested")}
                            className="px-3 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs shrink-0"
                          >
                            Harvest
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Desktop Batches Table (Tablets & Large screens) */}
            <div className="hidden md:block bg-white rounded-3xl border border-natural-border shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[720px] whitespace-nowrap">
                  <thead className="bg-natural-surface border-b border-natural-border text-natural-muted uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Batch Number</th>
                      <th className="p-4">Variety</th>
                      <th className="p-4">Planted Date</th>
                      <th className="p-4">Est. Harvest Date</th>
                      <th className="p-4">Trays</th>
                      <th className="p-4">Exp. Yield</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-natural-border/70">
                    {batches.map((batch) => {
                      const isReady =
                        batch.status === "ready_to_harvest" || (batch.days_until_harvest || 0) <= 0;

                      return (
                        <tr key={batch.id} className="hover:bg-natural-surface/40">
                          <td className="p-4 font-mono font-bold text-brand-950">
                            {batch.batch_number}
                          </td>
                          <td className="p-4 font-bold text-natural-text">
                            {batch.product_name}
                          </td>
                          <td className="p-4 text-natural-muted">
                            {batch.seeded_date}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-natural-text block">
                              {batch.estimated_harvest_date}
                            </span>
                            <span className="text-[10px] text-natural-muted">
                              ({batch.growing_days} day cycle)
                            </span>
                          </td>
                          <td className="p-4 font-bold text-natural-text">
                            {batch.trays_planted} Trays
                          </td>
                          <td className="p-4">
                            ~{batch.expected_yield_packs} packs
                          </td>
                          <td className="p-4">
                            <select
                              value={batch.status}
                              onChange={(e) => handleUpdateBatchStatus(batch.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                            >
                              <option value="germinating">Germinating</option>
                              <option value="growing">Growing</option>
                              <option value="ready_to_harvest">Ready to Harvest</option>
                              <option value="harvested">Harvested</option>
                              <option value="discarded">Discarded</option>
                            </select>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {batch.status !== "harvested" && (
                              <button
                                onClick={() => handleUpdateBatchStatus(batch.id, "harvested")}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors shadow-xs"
                              >
                                Mark Harvested
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRODUCTS & ON-HAND INVENTORY */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="pt-6 space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-natural-border shadow-subtle">
              <div>
                <h2 className="font-serif text-2xl font-bold text-natural-text">
                  Products & Catalogue Management
                </h2>
                <p className="text-xs text-natural-muted mt-1">
                  Manage live microgreen varieties, botanical descriptions, benefits, recipe ideas, pricing, and live inventory.
                </p>
              </div>

              <Button size="md" variant="primary" onClick={() => setShowAddProductModal(true)}>
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Add New Microgreen Variety</span>
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-4 flex flex-col justify-between hover:shadow-elevated transition-all"
                >
                  <div className="space-y-3.5">
                    {/* Top Status Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-natural-muted bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                          #{prod.display_order ?? 1}
                        </span>
                        <span className="text-[11px] font-semibold text-brand-900 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
                          {prod.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {prod.is_featured && (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            Featured
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            prod.is_available
                              ? "text-emerald-900 bg-emerald-50 border-emerald-200"
                              : "text-stone-500 bg-stone-100 border-stone-200"
                          }`}
                        >
                          {prod.is_available ? "● Active" : "○ Hidden / Inactive"}
                        </span>
                      </div>
                    </div>

                    {/* Product Media & Title */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0 group/img cursor-pointer">
                        <img
                          src={prod.image_url || "/assets/sunflower.png"}
                          alt={prod.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-natural-border shadow-2xs group-hover/img:brightness-90 transition-all"
                        />
                        <label
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center text-white cursor-pointer"
                          title="Click to upload/change photo"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuickProductImageUpload(prod, file);
                            }}
                          />
                          <Upload className="w-4 h-4" />
                          <span className="text-[9px] font-bold mt-0.5">Upload</span>
                        </label>
                        {prod.video_url && (
                          <span
                            className="absolute -bottom-1 -right-1 bg-brand-900 text-brand-100 p-1 rounded-full shadow-xs pointer-events-none"
                            title="Has video attached"
                          >
                            <Video className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-bold text-natural-text truncate">
                          {prod.name}
                        </h3>
                        <p className="text-[11px] font-mono text-natural-muted truncate">
                          slug: /{prod.slug}
                        </p>
                        <p className="text-xs text-natural-muted line-clamp-2 mt-1">
                          {prod.short_description || prod.description}
                        </p>
                      </div>
                    </div>

                    {/* Specs Card */}
                    <div className="p-3.5 bg-natural-surface/60 rounded-2xl text-xs space-y-1.5 border border-natural-border/60">
                      <div className="flex justify-between items-center">
                        <span className="text-natural-muted">Base Price:</span>
                        <span className="font-bold text-brand-950 text-sm">
                          {formatCurrency(prod.price)}{" "}
                          <span className="text-[11px] font-normal text-natural-muted">
                            / {prod.unit || "pack"}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-natural-muted">Growing Cycle:</span>
                        <span className="font-semibold text-natural-text">
                          {prod.growing_days} Days
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-natural-border/40">
                        <span className="text-natural-muted">Benefits & Uses:</span>
                        <span className="text-natural-text font-medium">
                          {prod.benefits?.length || 0} benefits • {prod.uses?.length || 0} uses
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action & Stock Controls */}
                  <div className="space-y-3 pt-3 border-t border-natural-border">
                    {/* Stock stepper */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-natural-muted block">
                          On-Hand Stock
                        </span>
                        <span className="font-serif text-lg font-bold text-brand-950">
                          {prod.stock_quantity || 0} {prod.unit || "Packs"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAdjustStock(prod.id, -5)}
                          className="w-7 h-7 rounded-lg border border-natural-border bg-white hover:bg-natural-surface font-bold text-xs"
                          title="Subtract 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 5)}
                          className="w-7 h-7 rounded-lg border border-natural-border bg-white hover:bg-natural-surface font-bold text-xs"
                          title="Add 5"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 20)}
                          className="px-2 h-7 rounded-lg bg-brand-900 text-white font-bold text-xs hover:bg-brand-950"
                          title="Add 20"
                        >
                          +20
                        </button>
                      </div>
                    </div>

                    {/* Edit Product Action Button */}
                    <button
                      onClick={() => openEditProductModal(prod)}
                      className="w-full py-2.5 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-950 font-bold text-xs flex items-center justify-center gap-2 border border-brand-200 transition-all shadow-2xs hover:shadow-xs"
                    >
                      <Pencil className="w-3.5 h-3.5 text-brand-700" />
                      <span>Edit Product Details & Content</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3B: OFFICE & FARM INVENTORY ASSETS */}
        {/* ========================================================= */}
        {activeTab === "assets" && (
          <div className="pt-6 space-y-6 animate-scale-in">
            {/* Top Action Bar */}
            <div className="flex items-center justify-end gap-2.5">
              <Button
                size="md"
                variant="outline"
                onClick={() => setShowQuickCategoryModal(true)}
                className="border-indigo-200 text-indigo-900 hover:bg-indigo-50 font-bold"
              >
                <span>+ Add Category</span>
              </Button>

              <Button
                size="md"
                variant="primary"
                onClick={() => setShowAddInventoryModal(true)}
                className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold"
              >
                <span>+ Add Item</span>
              </Button>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Tracked Items
                  </span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                    <Boxes className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-natural-text">
                    {officeInventory.length}
                  </span>
                  <span className="text-xs text-natural-muted block mt-0.5">
                    Distinct equipment types
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Active Categories
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-amber-800">
                    {totalOfficeCategoriesCount}
                  </span>
                  <span className="text-xs text-natural-muted block mt-0.5">
                    Configured categories ({officeCategories.length} total)
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-natural-border shadow-subtle flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Logged Movements
                  </span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                    <History className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-indigo-900">
                    {inventoryHistory.length}
                  </span>
                  <span className="text-xs text-natural-muted block mt-0.5">
                    Audit entries recorded over time
                  </span>
                </div>
              </div>
            </div>

            {/* Filter and Category Pills Toolbar */}
            <div className="bg-white p-5 rounded-3xl border border-natural-border shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-natural-muted" />
                  <input
                    type="text"
                    placeholder="Search crates, chairs, scales, location..."
                    value={inventorySearchQuery}
                    onChange={(e) => setInventorySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600"
                  />
                  {inventorySearchQuery && (
                    <button
                      onClick={() => setInventorySearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-natural-muted hover:text-natural-text"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs text-natural-muted">
                  <span>
                    Showing <span className="font-bold text-natural-text">{filteredOfficeInventory.length}</span> of {officeInventory.length} items
                  </span>
                </div>
              </div>

              {/* Category Filter Pills (Multi-line wrap for mobile, tablet, and desktop) */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedInventoryCategory("All")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedInventoryCategory === "All"
                      ? "bg-indigo-950 text-white shadow-xs ring-2 ring-indigo-950/20"
                      : "bg-natural-surface/90 text-natural-text hover:bg-natural-surface border border-natural-border"
                  }`}
                >
                  <span>All Categories</span>
                </button>

                {officeCategories.map((cat) => {
                  const isSelected = selectedInventoryCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedInventoryCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-indigo-700 text-white shadow-xs ring-2 ring-indigo-700/20"
                          : "bg-natural-surface/90 text-natural-text hover:bg-natural-surface border border-natural-border"
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setShowQuickCategoryModal(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition-colors"
                >
                  <span>+ Add Category</span>
                </button>
              </div>

              {/* Movement Type Filter for History View */}
              {inventoryViewMode === "history" && (
                <div className="flex items-center gap-2 pt-2 border-t border-natural-border/70 overflow-x-auto scrollbar-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-natural-muted shrink-0 mr-1">
                    Type:
                  </span>
                  {[
                    { key: "All", label: "All Movements" },
                    { key: "restock", label: "📦 Restock (+)" },
                    { key: "usage", label: "📤 Usage (-)" },
                    { key: "audit", label: "📋 Physical Count / Audit" },
                    { key: "damaged", label: "⚠️ Damaged / Loss" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setHistoryFilterType(t.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                        historyFilterType === t.key
                          ? "bg-indigo-900 text-white font-bold"
                          : "bg-natural-surface text-natural-text hover:bg-natural-border/60"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* VIEW MODE 1: GRID CARDS VIEW */}
            {inventoryViewMode === "cards" && (
              <>
                {filteredOfficeInventory.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-natural-border p-12 text-center shadow-subtle space-y-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                      <Boxes className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-natural-text">
                      No inventory items found
                    </h3>
                    <p className="text-xs text-natural-muted max-w-sm mx-auto">
                      {inventorySearchQuery
                        ? `No items matching "${inventorySearchQuery}". Try clearing search or changing category.`
                        : `No items logged in category "${selectedInventoryCategory}". Add crates, chairs, or supplies now.`}
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-2">
                      {inventorySearchQuery && (
                        <Button size="sm" variant="outline" onClick={() => setInventorySearchQuery("")}>
                          Clear Search
                        </Button>
                      )}
                      {selectedInventoryCategory !== "All" && (
                        <Button size="sm" variant="outline" onClick={() => setSelectedInventoryCategory("All")}>
                          View All Categories
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          if (selectedInventoryCategory !== "All") {
                            setInventoryForm((prev) => ({ ...prev, category: selectedInventoryCategory }));
                          }
                          setShowAddInventoryModal(true);
                        }}
                        className="bg-indigo-700 hover:bg-indigo-800 text-white"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        <span>Add Item</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredOfficeInventory.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-natural-border shadow-subtle p-3.5 flex flex-col justify-between hover:shadow-md transition-all space-y-2.5"
                        >
                          {/* Top Badges (Category & Location) */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                              {item.category}
                            </span>

                            {item.location && (
                              <span className="text-[10px] text-natural-muted font-medium truncate max-w-[140px]" title={item.location}>
                                {item.location}
                              </span>
                            )}
                          </div>

                          {/* Compact Item Image Banner */}
                          {item.image_url && (
                            <div className="relative h-28 w-full rounded-xl overflow-hidden bg-natural-surface border border-natural-border shadow-2xs">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Item Title */}
                          <div>
                            <h3 className="font-serif text-base font-bold text-natural-text leading-snug line-clamp-1" title={item.name}>
                              {item.name}
                            </h3>
                          </div>

                          {/* Compact Count & Steppers Row */}
                          <div className="bg-natural-warmWhite/90 border border-natural-border rounded-xl px-2.5 py-1.5 flex items-center justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-natural-muted">Count:</span>
                              <span className="font-serif text-lg font-extrabold text-brand-950">
                                {item.quantity}
                              </span>
                              <span className="text-[11px] font-semibold text-natural-muted">
                                {item.unit || "units"}
                              </span>
                            </div>

                            <div className="flex items-center gap-0.5">
                              <button
                                type="button"
                                onClick={() => handleAdjustInventoryCount(item, -5)}
                                disabled={item.quantity <= 0}
                                className="px-1.5 py-0.5 bg-white hover:bg-natural-surface text-natural-text disabled:opacity-40 border border-natural-border rounded text-[10px] font-bold transition-colors shadow-2xs"
                                title="Subtract 5"
                              >
                                -5
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustInventoryCount(item, -1)}
                                disabled={item.quantity <= 0}
                                className="p-1 bg-white hover:bg-natural-surface text-natural-text disabled:opacity-40 border border-natural-border rounded text-xs font-bold transition-colors shadow-2xs"
                                title="Subtract 1"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustInventoryCount(item, 1)}
                                className="p-1 bg-white hover:bg-natural-surface text-natural-text border border-natural-border rounded text-xs font-bold transition-colors shadow-2xs"
                                title="Add 1"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustInventoryCount(item, 5)}
                                className="px-1.5 py-0.5 bg-white hover:bg-natural-surface text-natural-text border border-natural-border rounded text-[10px] font-bold transition-colors shadow-2xs"
                                title="Add 5"
                              >
                                +5
                              </button>
                            </div>
                          </div>

                          {/* Quick Actions (Adjust Stock & History) */}
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              onClick={() => openAdjustModal(item)}
                              className="w-full py-1.5 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-950 text-[11px] font-bold text-center border border-indigo-200 transition-colors"
                            >
                              Log / Adjust
                            </button>

                            <button
                              type="button"
                              onClick={() => openItemHistoryModal(item)}
                              className="w-full py-1.5 px-2 rounded-lg bg-natural-surface hover:bg-natural-border/70 text-natural-text text-[11px] font-bold text-center border border-natural-border transition-colors"
                            >
                              History
                            </button>
                          </div>

                          {/* Edit Details & Delete Footer */}
                          <div className="pt-1.5 border-t border-natural-border/60 flex items-center justify-between text-[11px]">
                            <button
                              type="button"
                              onClick={() => openEditInventoryModal(item)}
                              className="font-semibold text-natural-muted hover:text-indigo-700 transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteInventoryItem(item)}
                              className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                              title="Delete from Inventory"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* VIEW MODE 2: STOCK MOVEMENT HISTORY (BAR GRAPH + AUDIT LOG) */}
            {inventoryViewMode === "history" && (
              <div className="space-y-6">
                {/* Stock Movement History Bar Graph */}
                <BarGraph
                  title="Stock Movement History & Comparison"
                  subtitle="Visualizes when we had how much: Yesterday vs. Now count movements across all supplies"
                  mode="comparison"
                  data={officeInventory.map((item) => ({
                    id: item.id,
                    label: item.name,
                    category: item.category,
                    currentValue: item.quantity,
                    previousValue: item.last_previous_quantity ?? undefined,
                    unit: item.unit,
                    notes: item.last_notes ?? undefined,
                  }))}
                />

                <div className="bg-white rounded-3xl border border-natural-border shadow-subtle p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-natural-border pb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-natural-text">
                        Stock Movement Audit Log
                      </h3>
                      <p className="text-xs text-natural-muted mt-0.5">
                        Chronological history of supplies count changes, recording when we had how much (e.g. Yesterday vs Now).
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInventoryViewMode("cards")}
                      className="border-indigo-200 text-indigo-900 hover:bg-indigo-50"
                    >
                      <span>← Back to Grid View</span>
                    </Button>
                  </div>

                {filteredHistory.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-natural-text">
                      No stock movement logs found
                    </h4>
                    <p className="text-xs text-natural-muted max-w-sm mx-auto">
                      {historyFilterType !== "All"
                        ? `No movement records with type "${historyFilterType}". Try selecting "All Movements".`
                        : "Use the \"Log Count / Adjust\" button on any inventory item to record a count change."}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-natural-border overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-natural-muted font-bold uppercase tracking-wider text-[10px] bg-natural-surface/60 border-y border-natural-border">
                          <th className="py-3 px-4">Date / Time</th>
                          <th className="py-3 px-4">Item & Category</th>
                          <th className="py-3 px-4 text-center">Movement Flow</th>
                          <th className="py-3 px-4 text-center">Difference</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Notes / Explanation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-natural-border/70">
                        {filteredHistory.map((hist) => {
                          const isPositive = hist.change_amount >= 0;
                          const isZero = hist.change_amount === 0;

                          const typeBadge =
                            hist.change_type === "restock"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : hist.change_type === "usage"
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : hist.change_type === "damaged"
                              ? "bg-red-50 text-red-800 border-red-200"
                              : hist.change_type === "initial_stock"
                              ? "bg-indigo-50 text-indigo-900 border-indigo-200"
                              : "bg-blue-50 text-blue-900 border-blue-200";

                          return (
                            <tr key={hist.id} className="hover:bg-natural-warmWhite/80 transition-colors">
                              <td className="py-3.5 px-4 font-medium whitespace-nowrap text-natural-text">
                                <span className="font-bold block text-natural-text">
                                  {formatHistoryDate(hist.recorded_at)}
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="font-bold text-natural-text block text-sm">
                                  {hist.item_name}
                                </span>
                                <span className="text-[11px] text-indigo-900 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                                  {hist.category}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono">
                                <div className="inline-flex items-center gap-1.5 bg-natural-surface px-2.5 py-1 rounded-xl border border-natural-border">
                                  <span className="text-natural-muted font-bold">{hist.previous_quantity}</span>
                                  <span className="text-indigo-400 font-bold">➔</span>
                                  <span className="font-extrabold text-brand-950 text-sm">
                                    {hist.new_quantity} {hist.unit}
                                  </span>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold border ${
                                    isPositive
                                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                      : isZero
                                      ? "bg-gray-100 text-gray-800 border-gray-300"
                                      : "bg-rose-100 text-rose-900 border-rose-300"
                                  }`}
                                >
                                  {isPositive && !isZero ? (
                                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                                  ) : !isPositive ? (
                                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-700" />
                                  ) : null}
                                  <span>
                                    {isPositive && !isZero ? `+${hist.change_amount}` : hist.change_amount}{" "}
                                    {hist.unit}
                                  </span>
                                </span>
                              </td>

                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeBadge}`}>
                                  {hist.change_type.replace(/_/g, " ")}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-natural-muted text-xs max-w-xs">
                                {hist.notes || "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: OFFLINE & DIRECT SALES */}
        {/* ========================================================= */}
        {activeTab === "offline" && (
          <div className="pt-6 space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-natural-border shadow-subtle">
              <div>
                <h2 className="font-serif text-2xl font-bold text-natural-text">
                  Offline & Direct Retail Sales Log
                </h2>
                <p className="text-xs text-natural-muted mt-1">
                  Log direct sales from farmer markets, walk-ins, WhatsApp orders, or B2B cafe supplies. Inventory is auto-deducted.
                </p>
              </div>

              <Button size="md" variant="primary" onClick={() => setShowAddSaleModal(true)}>
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Log New Direct Sale</span>
              </Button>
            </div>

            {/* Mobile Sales Card View (phones & small screens) */}
            <div className="space-y-3.5 md:hidden">
              {offlineSales.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-natural-border text-center text-xs text-natural-muted">
                  No offline sales recorded yet.
                </div>
              ) : (
                offlineSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="p-4 rounded-2xl bg-white border border-natural-border shadow-subtle space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-brand-950 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                        {sale.receipt_number}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-natural-surface text-natural-text px-2 py-0.5 rounded text-[10px] font-semibold border border-natural-border">
                          {sale.channel.replace(/_/g, " ")}
                        </span>
                        <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {sale.payment_method}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div>
                        <h4 className="font-bold text-sm text-natural-text">
                          {sale.product_name}{" "}
                          <span className="font-normal text-natural-muted text-xs">
                            ({sale.variant_name})
                          </span>
                        </h4>
                        <p className="text-xs text-natural-muted mt-0.5">
                          {sale.sale_date} • {sale.customer_name || "Direct Customer"}{" "}
                          {sale.customer_phone && `(${sale.customer_phone})`}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif font-bold text-base text-brand-950 block">
                          {formatCurrency(sale.total_amount)}
                        </span>
                        <span className="text-[11px] text-natural-muted font-medium">
                          {sale.quantity} packs
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Sales Table (Tablets & Large screens) */}
            <div className="hidden md:block bg-white rounded-3xl border border-natural-border shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px] whitespace-nowrap">
                  <thead className="bg-natural-surface border-b border-natural-border text-natural-muted uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Receipt #</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Variety & Pack</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Channel</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Customer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-natural-border/70">
                    {offlineSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-natural-surface/40">
                        <td className="p-4 font-mono font-bold text-brand-950">
                          {sale.receipt_number}
                        </td>
                        <td className="p-4 text-natural-muted">
                          {sale.sale_date}
                        </td>
                        <td className="p-4 font-bold text-natural-text">
                          {sale.product_name}{" "}
                          <span className="font-normal text-natural-muted">
                            ({sale.variant_name})
                          </span>
                        </td>
                        <td className="p-4 font-bold">{sale.quantity} packs</td>
                        <td className="p-4 font-serif font-bold text-sm text-brand-950">
                          {formatCurrency(sale.total_amount)}
                        </td>
                        <td className="p-4">
                          <span className="bg-natural-surface text-natural-text px-2.5 py-1 rounded-md text-[11px] font-medium border border-natural-border">
                            {sale.channel.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                            {sale.payment_method}
                          </span>
                        </td>
                        <td className="p-4 text-natural-muted">
                          {sale.customer_name || "Direct Customer"}{" "}
                          {sale.customer_phone && `(${sale.customer_phone})`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: ONLINE ORDERS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "orders" && (
          <div className="pt-6 space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-natural-border shadow-subtle">
              <div>
                <h2 className="font-serif text-2xl font-bold text-natural-text">
                  Online Bookings & Harvest Orders
                </h2>
                <p className="text-xs text-natural-muted mt-1">
                  View incoming orders placed on harivu.in and advance order status from preparation to table delivery.
                </p>
              </div>
            </div>

            {/* Mobile Orders Card View (phones & small screens) */}
            <div className="space-y-3.5 md:hidden">
              {orders.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-natural-border text-center text-xs text-natural-muted">
                  No online orders placed yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-white border border-natural-border shadow-subtle space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-brand-950 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                        {ord.order_number}
                      </span>
                      <span className="font-serif font-bold text-base text-brand-950">
                        {formatCurrency(ord.total)}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-sm text-natural-text">{ord.delivery_name}</p>
                      <p className="text-xs text-natural-muted">{ord.delivery_phone}</p>
                      <p className="text-xs text-natural-muted mt-1 bg-natural-surface/60 p-2 rounded-xl border border-natural-border/60">
                        📍 {ord.address}, {ord.locality}, {ord.city} - {ord.pincode}
                      </p>
                    </div>

                    {ord.items && ord.items.length > 0 && (
                      <div className="text-xs text-natural-muted border-t border-natural-border/60 pt-2 space-y-1">
                        {ord.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span>{item.product_name} ({item.variant_name})</span>
                            <span className="font-semibold text-natural-text">× {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-1">
                      <label className="text-[10px] uppercase font-bold text-natural-muted block mb-1">
                        Order Status
                      </label>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="harvested">Harvested</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Orders Table (Tablets & Large screens) */}
            <div className="hidden md:block bg-white rounded-3xl border border-natural-border shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px] whitespace-nowrap">
                  <thead className="bg-natural-surface border-b border-natural-border text-natural-muted uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Address & Area</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Order Status</th>
                      <th className="p-4">Items Breakdown</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-natural-border/70">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-natural-surface/40">
                        <td className="p-4 font-mono font-bold text-brand-950">
                          {ord.order_number}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-natural-text">{ord.delivery_name}</p>
                          <p className="text-natural-muted">{ord.delivery_phone}</p>
                        </td>
                        <td className="p-4 text-natural-muted max-w-xs">
                          {ord.address}, {ord.locality}, {ord.city} - {ord.pincode}
                        </td>
                        <td className="p-4 font-serif font-bold text-sm text-brand-950">
                          {formatCurrency(ord.total)}
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="harvested">Harvested</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-natural-muted">
                          {ord.items?.map((item: any, idx: number) => (
                            <span key={idx} className="block">
                              • {item.product_name} ({item.variant_name}) × {item.quantity}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: RECORD SEEDING BATCH */}
      {/* ========================================================= */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-elevated space-y-4 my-auto max-h-[92vh] overflow-y-auto">
            <div className="border-b border-natural-border pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-brand-700" />
                <h3 className="font-serif text-xl font-bold text-natural-text">
                  Record New Seeding Batch
                </h3>
              </div>
              <button
                onClick={() => setShowAddBatchModal(false)}
                className="text-natural-muted hover:text-natural-text p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                  Microgreen Variety
                </label>
                <select
                  value={batchForm.product_id}
                  onChange={(e) => setBatchForm({ ...batchForm, product_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.growing_days} days cycle)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Date Seeded"
                  type="date"
                  required
                  value={batchForm.seeded_date}
                  onChange={(e) => setBatchForm({ ...batchForm, seeded_date: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                    Est. Harvest Date
                  </label>
                  <div className="px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm font-bold text-brand-950">
                    {estimatedHarvestDatePreview}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Trays Planted"
                  type="number"
                  min={1}
                  required
                  value={batchForm.trays_planted}
                  onChange={(e) =>
                    setBatchForm({ ...batchForm, trays_planted: parseInt(e.target.value) || 1 })
                  }
                />

                <Input
                  label="Expected Yield (Packs)"
                  type="number"
                  min={1}
                  required
                  value={batchForm.expected_yield_packs}
                  onChange={(e) =>
                    setBatchForm({
                      ...batchForm,
                      expected_yield_packs: parseInt(e.target.value) || 5,
                    })
                  }
                />
              </div>

              <Input
                label="Seed Lot / Seed Origin Notes"
                placeholder="e.g. Non-GMO Lot #441, Soaked 8 hours"
                value={batchForm.seed_lot_notes}
                onChange={(e) => setBatchForm({ ...batchForm, seed_lot_notes: e.target.value })}
              />

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-natural-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddBatchModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Save Seeding Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: LOG DIRECT OFFLINE SALE */}
      {/* ========================================================= */}
      {showAddSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-elevated space-y-4 my-auto max-h-[92vh] overflow-y-auto">
            <div className="border-b border-natural-border pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif text-xl font-bold text-natural-text">
                  Log Direct / Offline Sale
                </h3>
              </div>
              <button
                onClick={() => setShowAddSaleModal(false)}
                className="text-natural-muted hover:text-natural-text p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOfflineSale} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                  Select Product Variety
                </label>
                <select
                  value={offlineForm.product_id}
                  onChange={(e) => {
                    const prod = products.find((p) => p.id === e.target.value);
                    if (prod) {
                      setOfflineForm({
                        ...offlineForm,
                        product_id: prod.id,
                        product_name: prod.name,
                        variant_name: prod.variants?.[0]?.name || "50g Pack",
                        unit_price: prod.variants?.[0]?.price || prod.price,
                      });
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (On-Hand: {p.stock_quantity || 0} packs)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Quantity (Packs)"
                  type="number"
                  min={1}
                  required
                  value={offlineForm.quantity}
                  onChange={(e) =>
                    setOfflineForm({
                      ...offlineForm,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                />

                <Input
                  label="Unit Price (INR)"
                  type="number"
                  min={0}
                  required
                  value={offlineForm.unit_price}
                  onChange={(e) =>
                    setOfflineForm({
                      ...offlineForm,
                      unit_price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center text-sm font-bold text-emerald-950">
                <span>Total Amount:</span>
                <span className="font-serif text-lg">
                  {formatCurrency(offlineForm.unit_price * offlineForm.quantity)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                    Sales Channel
                  </label>
                  <select
                    value={offlineForm.channel}
                    onChange={(e) => setOfflineForm({ ...offlineForm, channel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                  >
                    <option value="direct">Direct Walk-in</option>
                    <option value="farmers_market">Farmers Market</option>
                    <option value="whatsapp">WhatsApp Order</option>
                    <option value="restaurant_b2b">Restaurant / Cafe B2B</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                    Payment Method
                  </label>
                  <select
                    value={offlineForm.payment_method}
                    onChange={(e) => setOfflineForm({ ...offlineForm, payment_method: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                  >
                    <option value="upi">UPI / QR Code</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card POS</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Customer Name (Optional)"
                  placeholder="e.g. Ramesh"
                  value={offlineForm.customer_name}
                  onChange={(e) => setOfflineForm({ ...offlineForm, customer_name: e.target.value })}
                />

                <Input
                  label="Customer Phone (Optional)"
                  placeholder="e.g. 9876543210"
                  value={offlineForm.customer_phone}
                  onChange={(e) => setOfflineForm({ ...offlineForm, customer_phone: e.target.value })}
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-natural-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddSaleModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Record Sale & Deduct Stock
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD NEW MICROGREEN VARIETY */}
      {/* ========================================================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-elevated space-y-5 animate-scale-in my-auto max-h-[92vh] overflow-y-auto border border-natural-border">
            <div className="border-b border-natural-border pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-700" />
                <h3 className="font-serif text-xl font-bold text-natural-text">
                  Add Microgreen Variety
                </h3>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="w-8 h-8 rounded-full bg-natural-surface hover:bg-natural-border text-natural-muted hover:text-natural-text flex items-center justify-center transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <Input
                label="Variety Name"
                required
                placeholder="e.g. Red Kohlrabi Microgreens"
                value={newProductForm.name}
                onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                    Category Profile
                  </label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                  >
                    <option value="Spicy & Peppery">Spicy & Peppery</option>
                    <option value="Nutty & Crunchy">Nutty & Crunchy</option>
                    <option value="Sweet & Tender">Sweet & Tender</option>
                    <option value="Mild & Nutritious">Mild & Nutritious</option>
                    <option value="Earthy & Vibrant">Earthy & Vibrant</option>
                    <option value="Zesty & Bold">Zesty & Bold</option>
                    <option value="Balanced Mix">Balanced Mix</option>
                  </select>
                </div>

                <Input
                  label="Growing Days (Cycle)"
                  type="number"
                  min={3}
                  required
                  value={newProductForm.growing_days}
                  onChange={(e) =>
                    setNewProductForm({
                      ...newProductForm,
                      growing_days: parseInt(e.target.value) || 10,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Base Price (50g INR)"
                  type="number"
                  min={1}
                  required
                  value={newProductForm.price}
                  onChange={(e) =>
                    setNewProductForm({
                      ...newProductForm,
                      price: parseFloat(e.target.value) || 80,
                    })
                  }
                />

                <Input
                  label="Initial Stock Quantity"
                  type="number"
                  min={0}
                  required
                  value={newProductForm.stock_quantity}
                  onChange={(e) =>
                    setNewProductForm({
                      ...newProductForm,
                      stock_quantity: parseInt(e.target.value) || 50,
                    })
                  }
                />
              </div>

              <Input
                label="Flavor Profile / Taste Notes"
                placeholder="e.g. Mild, sweet, crunchy with tender stems"
                value={newProductForm.flavor_profile}
                onChange={(e) => setNewProductForm({ ...newProductForm, flavor_profile: e.target.value })}
              />

              <ImageUpload
                label="Variety Photo *"
                value={newProductForm.image_url}
                onChange={(url) => setNewProductForm({ ...newProductForm, image_url: url })}
                helperText="Upload a photo from your device or provide an image URL. Displayed in customer catalogue."
              />

              <Textarea
                label="Short Description"
                required
                rows={2}
                placeholder="Brief summary for product card"
                value={newProductForm.short_description}
                onChange={(e) => setNewProductForm({ ...newProductForm, short_description: e.target.value })}
              />

              <Textarea
                label="Full Description"
                required
                rows={3}
                placeholder="Detailed growing and culinary information"
                value={newProductForm.description}
                onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
              />

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-natural-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddProductModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Publish to Catalogue
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: EDIT PRODUCT MODAL */}
      {/* ========================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-elevated space-y-6 my-auto animate-scale-in max-h-[92vh] overflow-y-auto border border-natural-border">
            {/* Header */}
            <div className="border-b border-natural-border pb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={editProductForm.image_url || "/assets/sunflower.png"}
                  alt="Product preview"
                  className="w-14 h-14 rounded-2xl object-cover border border-natural-border shadow-xs shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-natural-text">
                      Edit {editProductForm.name || "Microgreen Product"}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      ID: {editProductForm.id?.slice(0, 8)}...
                    </span>
                  </div>
                  <p className="text-xs text-natural-muted mt-0.5">
                    Update live pricing, botanical specs, video/media assets, benefits, and storefront visibility.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-natural-surface hover:bg-natural-border text-natural-muted hover:text-natural-text flex items-center justify-center transition-colors shrink-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedProduct} className="space-y-6">
              {/* Section 1: Basic Identity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-950 border-b border-natural-border/60 pb-1.5">
                  <Package className="w-4 h-4 text-brand-700" />
                  <span>1. General Details & Category</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Variety Name"
                    required
                    placeholder="e.g. Sunflower Microgreens"
                    value={editProductForm.name}
                    onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                  />

                  <Input
                    label="URL Slug"
                    required
                    placeholder="e.g. sunflower-microgreens"
                    value={editProductForm.slug}
                    onChange={(e) => setEditProductForm({ ...editProductForm, slug: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                      Category Profile
                    </label>
                    <select
                      value={editProductForm.category}
                      onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm font-medium focus:outline-none focus:border-brand-900"
                    >
                      <option value="Nutty & Crunchy">Nutty & Crunchy</option>
                      <option value="Sweet & Tender">Sweet & Tender</option>
                      <option value="Spicy & Peppery">Spicy & Peppery</option>
                      <option value="Earthy & Vibrant">Earthy & Vibrant</option>
                      <option value="Mild & Nutritious">Mild & Nutritious</option>
                      <option value="Zesty & Bold">Zesty & Bold</option>
                      <option value="Balanced Mix">Balanced Mix</option>
                      <option value="Microgreens">Microgreens (General)</option>
                    </select>
                  </div>

                  <Input
                    label="Packaging Unit"
                    required
                    placeholder="e.g. 50g pack, 100g pack"
                    value={editProductForm.unit}
                    onChange={(e) => setEditProductForm({ ...editProductForm, unit: e.target.value })}
                  />

                  <Input
                    label="Display Order"
                    type="number"
                    min={1}
                    value={editProductForm.display_order}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                    helperText="Controls sequence on /products"
                  />
                </div>
              </div>

              {/* Section 2: Pricing, Stock & Visibility */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-950 border-b border-natural-border/60 pb-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>2. Pricing, Inventory & Storefront Visibility</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Base Price (INR ₹)"
                    type="number"
                    min={1}
                    required
                    value={editProductForm.price}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                  />

                  <Input
                    label="Growing Cycle (Days)"
                    type="number"
                    min={3}
                    required
                    value={editProductForm.growing_days}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        growing_days: parseInt(e.target.value) || 10,
                      })
                    }
                  />

                  <Input
                    label="Live Stock Quantity"
                    type="number"
                    min={0}
                    required
                    value={editProductForm.stock_quantity}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        stock_quantity: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-natural-surface/60 border border-natural-border">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editProductForm.is_available}
                      onChange={(e) =>
                        setEditProductForm({
                          ...editProductForm,
                          is_available: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-brand-900 accent-brand-900 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-natural-text block">
                        Available for Sale
                      </span>
                      <span className="text-[11px] text-natural-muted">
                        Allow customers to order this microgreen online
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editProductForm.is_featured}
                      onChange={(e) =>
                        setEditProductForm({
                          ...editProductForm,
                          is_featured: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-amber-600 accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-natural-text block flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        Featured Variety
                      </span>
                      <span className="text-[11px] text-natural-muted">
                        Highlight on homepage top recommendations
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 2.5: Harvest Pack Sizes & Variant Pricing */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-natural-border/60 pb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-950">
                    <ShoppingBag className="w-4 h-4 text-brand-700" />
                    <span>Harvest Pack Sizes & Variant Pricing ({editProductForm.variants.length})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewVariant}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-950 border border-brand-200 rounded-lg text-xs font-bold transition-all shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pack Size</span>
                  </button>
                </div>

                <p className="text-xs text-natural-muted">
                  Configure the harvest pack weights (e.g. 50g, 100g, 200g) and their corresponding prices displayed on the product ordering page.
                </p>

                <div className="space-y-2.5">
                  {editProductForm.variants.map((variant, idx) => (
                    <div
                      key={variant.id || idx}
                      className="p-3.5 rounded-2xl bg-natural-surface/50 border border-natural-border flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-natural-muted block mb-1">
                            Pack Label
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 50g Regular Pack"
                            value={variant.name}
                            onChange={(e) =>
                              handleVariantFieldChange(idx, "name", e.target.value)
                            }
                            className="w-full px-3 py-1.5 rounded-xl border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-natural-muted block mb-1">
                            Weight (Grams)
                          </label>
                          <input
                            type="number"
                            min={1}
                            required
                            placeholder="50"
                            value={variant.weight_grams}
                            onChange={(e) =>
                              handleVariantFieldChange(
                                idx,
                                "weight_grams",
                                parseInt(e.target.value) || 50
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-xl border border-natural-border bg-white text-xs font-semibold focus:outline-none focus:border-brand-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-natural-muted block mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder="80"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantFieldChange(
                                idx,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-xl border border-natural-border bg-white text-xs font-bold text-brand-950 focus:outline-none focus:border-brand-900"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-natural-border/60">
                        <label
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer select-none ${
                            variant.is_default
                              ? "bg-brand-100 text-brand-950 border-brand-300"
                              : "bg-white text-natural-muted border-natural-border"
                          }`}
                          title="Primary pack size shown by default"
                        >
                          <input
                            type="checkbox"
                            checked={variant.is_default || false}
                            onChange={(e) =>
                              handleVariantFieldChange(idx, "is_default", e.target.checked)
                            }
                            className="w-3.5 h-3.5 rounded text-brand-900 accent-brand-900"
                          />
                          <span>Default</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemoveVariantRow(idx)}
                          disabled={editProductForm.variants.length <= 1}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            editProductForm.variants.length <= 1
                              ? "opacity-30 cursor-not-allowed text-stone-400 border-stone-200"
                              : "text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                          }`}
                          title="Delete pack size"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Media & Video Assets */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-950 border-b border-natural-border/60 pb-1.5">
                  <Video className="w-4 h-4 text-purple-700" />
                  <span>3. Media, Images & Video Presentation</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <ImageUpload
                    label="Variety Photo *"
                    value={editProductForm.image_url}
                    onChange={(url) => setEditProductForm({ ...editProductForm, image_url: url })}
                    helperText="Upload a photo from your device or paste a URL."
                  />

                  <div className="space-y-3">
                    <Input
                      label="Video Asset URL / Path (Optional)"
                      placeholder="/assets/sunflower_intro.mp4 or https://..."
                      value={editProductForm.video_url}
                      onChange={(e) =>
                        setEditProductForm({ ...editProductForm, video_url: e.target.value })
                      }
                      helperText="Local video (e.g. /assets/sunflower_intro.mp4) or MP4 link"
                    />

                    {editProductForm.image_url && (
                      <div className="text-xs text-natural-muted font-mono break-all bg-natural-surface p-2.5 rounded-xl border border-natural-border">
                        <span className="font-bold text-natural-text block text-[10px] uppercase font-sans mb-0.5">
                          Active Image URL / Path:
                        </span>
                        {editProductForm.image_url}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Descriptions & Flavour Profile */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-950 border-b border-natural-border/60 pb-1.5">
                  <Sparkles className="w-4 h-4 text-brand-700" />
                  <span>4. Descriptions & Flavour Profile</span>
                </div>

                <Textarea
                  label="Short Card Description"
                  required
                  rows={2}
                  placeholder="Crisp, tender sunflower shoots with a rich, nutty flavor..."
                  value={editProductForm.short_description}
                  onChange={(e) =>
                    setEditProductForm({
                      ...editProductForm,
                      short_description: e.target.value,
                    })
                  }
                  helperText="Shown on product catalogue cards and preview summaries"
                />

                <Textarea
                  label="Full Botanical Description"
                  required
                  rows={3}
                  placeholder="Sunflower microgreens are tender young shoots harvested at their peak nutritional value..."
                  value={editProductForm.description}
                  onChange={(e) =>
                    setEditProductForm({
                      ...editProductForm,
                      description: e.target.value,
                    })
                  }
                  helperText="Detailed overview displayed on the product detail page"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Flavor Profile & Taste"
                    placeholder="e.g. Crisp, sweet, nutty flavor"
                    value={editProductForm.flavor_profile}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        flavor_profile: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Harvest & Storage Notes"
                    placeholder="e.g. Harvested live; keep refrigerated at 4°C for 7-10 days"
                    value={editProductForm.harvest_notes}
                    onChange={(e) =>
                      setEditProductForm({
                        ...editProductForm,
                        harvest_notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Section 5: Health & Nutritional Benefits (Dynamic List) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-natural-border/60 pb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-950">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    <span>5. Health & Nutritional Benefits ({editProductForm.benefits.length})</span>
                  </div>
                  <span className="text-[11px] text-natural-muted">
                    Click ✕ on any tag to remove
                  </span>
                </div>

                {/* Tag Pills */}
                {editProductForm.benefits.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {editProductForm.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium"
                      >
                        <span>✓ {benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(idx)}
                          className="w-4 h-4 rounded-full hover:bg-emerald-200/80 text-emerald-800 flex items-center justify-center transition-colors text-[10px]"
                          title="Remove benefit"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-natural-muted italic py-1">
                    No specific benefits listed yet. Add one below.
                  </p>
                )}

                {/* Add Benefit Input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="e.g. Rich in Vitamin E and B-complex vitamins"
                    value={newBenefitInput}
                    onChange={(e) => setNewBenefitInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Benefit</span>
                  </button>
                </div>
              </div>

              {/* Section 6: Culinary Uses & Recipes (Dynamic List) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-natural-border/60 pb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950">
                    <Receipt className="w-4 h-4 text-amber-700" />
                    <span>6. Culinary Uses & Recipe Ideas ({editProductForm.uses.length})</span>
                  </div>
                  <span className="text-[11px] text-natural-muted">
                    Click ✕ on any tag to remove
                  </span>
                </div>

                {/* Tag Pills */}
                {editProductForm.uses.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {editProductForm.uses.map((use, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-medium"
                      >
                        <span>• {use}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUse(idx)}
                          className="w-4 h-4 rounded-full hover:bg-amber-200/80 text-amber-800 flex items-center justify-center transition-colors text-[10px]"
                          title="Remove use"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-natural-muted italic py-1">
                    No culinary uses listed yet. Add one below.
                  </p>
                )}

                {/* Add Use Input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="e.g. Toss into fresh salads for extra crunch"
                    value={newUseInput}
                    onChange={(e) => setNewUseInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddUse();
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-amber-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddUse}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Use</span>
                  </button>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-natural-border">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  disabled={isSavingProduct}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isSavingProduct}
                  className="shadow-md"
                >
                  {isSavingProduct ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Save Product Changes</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD ASSET / INVENTORY ITEM */}
      {showAddInventoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 border border-natural-border shadow-elevated space-y-5 sm:space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-natural-border pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-natural-text">
                  Add Office or Farm Asset
                </h3>
                <p className="text-xs text-natural-muted">
                  Log new non-crop physical equipment, crates, furniture, or supplies
                </p>
              </div>
              <button
                onClick={() => setShowAddInventoryModal(false)}
                className="text-natural-muted hover:text-natural-text p-1.5 rounded-xl hover:bg-natural-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInventoryItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harvest Crates 20L, Rolling Desk Chair, Stainless Steel Scale"
                  value={inventoryForm.name}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              {/* Category Selection / Creation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Category *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingNewCategory(!isCreatingNewCategory);
                      if (!isCreatingNewCategory) setCustomCategoryInput("");
                    }}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline flex items-center gap-1"
                  >
                    {isCreatingNewCategory ? "← Select Existing Category" : "+ Create New Category"}
                  </button>
                </div>

                {isCreatingNewCategory ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="Enter new category name (e.g. Packaging & Tape, Lighting, Tools)"
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-indigo-300 bg-indigo-50/40 text-sm focus:outline-none focus:border-indigo-600 font-semibold text-indigo-950"
                      autoFocus
                    />
                    <p className="text-[11px] text-natural-muted">
                      This category will be created and added to your filter tabs automatically.
                    </p>
                  </div>
                ) : (
                  <Dropdown
                    value={inventoryForm.category}
                    onChange={(val) => {
                      if (val === "__NEW__") {
                        setIsCreatingNewCategory(true);
                      } else {
                        setInventoryForm({ ...inventoryForm, category: val });
                      }
                    }}
                    options={[
                      ...officeCategories.map((cat) => ({
                        value: cat,
                        label: cat,
                        badge: `${officeInventory.filter((i) => i.category === cat).length} items`,
                      })),
                      { value: "__NEW__", label: "+ Add Custom Category..." },
                    ]}
                    placeholder="Select category"
                  />
                )}
              </div>

              {/* Service / Item Image Upload */}
              <ImageUpload
                label="Item or Service Image"
                value={inventoryForm.image_url}
                onChange={(url) => setInventoryForm({ ...inventoryForm, image_url: url })}
                helperText="Upload a photo or choose a preset icon. Displayed in Catalogue and Office Inventory."
              />

              {/* Quantity and Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                    Count / Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={inventoryForm.quantity}
                    onChange={(e) =>
                      setInventoryForm({ ...inventoryForm, quantity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                    Unit of Measure *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. crates, chairs, trays, pcs, units"
                    value={inventoryForm.unit}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Physical Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Packhouse Rack 2, Office Room A"
                  value={inventoryForm.location}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Notes / Specifications (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Dimensions, brand name, purchase date, or maintenance notes"
                  value={inventoryForm.notes}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-natural-border">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setShowAddInventoryModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Save Inventory Item</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: EDIT ASSET / INVENTORY ITEM */}
      {editingInventoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 border border-natural-border shadow-elevated space-y-5 sm:space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-natural-border pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-natural-text">
                  Edit Inventory Item
                </h3>
                <p className="text-xs text-natural-muted">
                  Update counts, location, category, or specifications
                </p>
              </div>
              <button
                onClick={() => setEditingInventoryItem(null)}
                className="text-natural-muted hover:text-natural-text p-1.5 rounded-xl hover:bg-natural-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateInventoryItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={editInventoryForm.name}
                  onChange={(e) => setEditInventoryForm({ ...editInventoryForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted">
                    Category *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditCreatingNewCategory(!isEditCreatingNewCategory);
                      if (!isEditCreatingNewCategory) setEditCustomCategoryInput("");
                    }}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline flex items-center gap-1"
                  >
                    {isEditCreatingNewCategory ? "← Select Existing" : "+ New Category"}
                  </button>
                </div>

                {isEditCreatingNewCategory ? (
                  <input
                    type="text"
                    required
                    placeholder="Enter new category name..."
                    value={editCustomCategoryInput}
                    onChange={(e) => setEditCustomCategoryInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-indigo-300 bg-indigo-50/40 text-sm focus:outline-none focus:border-indigo-600 font-semibold text-indigo-950"
                    autoFocus
                  />
                ) : (
                  <Dropdown
                    value={editInventoryForm.category}
                    onChange={(val) => {
                      if (val === "__NEW__") {
                        setIsEditCreatingNewCategory(true);
                      } else {
                        setEditInventoryForm({ ...editInventoryForm, category: val });
                      }
                    }}
                    options={[
                      ...officeCategories.map((cat) => ({
                        value: cat,
                        label: cat,
                        badge: `${officeInventory.filter((i) => i.category === cat).length} items`,
                      })),
                      { value: "__NEW__", label: "+ Add Custom Category..." },
                    ]}
                    placeholder="Select category"
                  />
                )}
              </div>

              {/* Service / Item Image Upload */}
              <ImageUpload
                label="Item or Service Image"
                value={editInventoryForm.image_url}
                onChange={(url) => setEditInventoryForm({ ...editInventoryForm, image_url: url })}
                helperText="Upload a photo or choose a preset icon. Displayed in Catalogue and Office Inventory."
              />

              {/* Count and Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                    Count / Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={editInventoryForm.quantity}
                    onChange={(e) =>
                      setEditInventoryForm({ ...editInventoryForm, quantity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                    Unit of Measure *
                  </label>
                  <input
                    type="text"
                    required
                    value={editInventoryForm.unit}
                    onChange={(e) => setEditInventoryForm({ ...editInventoryForm, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Physical Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Packhouse Rack 1"
                  value={editInventoryForm.location}
                  onChange={(e) => setEditInventoryForm({ ...editInventoryForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Notes / Specifications
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes, dimensions, or upkeep notes"
                  value={editInventoryForm.notes}
                  onChange={(e) => setEditInventoryForm({ ...editInventoryForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-natural-border">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setEditingInventoryItem(null)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white"
                >
                  <Check className="w-4 h-4 mr-1.5" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: QUICK ADD CATEGORY MODAL */}
      {showQuickCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 border border-natural-border shadow-elevated space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-natural-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-text">
                  Add New Category
                </h3>
                <p className="text-[11px] text-natural-muted">
                  Organize office assets & equipment
                </p>
              </div>
              <button
                onClick={() => setShowQuickCategoryModal(false)}
                className="text-natural-muted hover:text-natural-text p-1 rounded-lg hover:bg-natural-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuickAddCategory();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harvest Crates, Office Electronics, Packaging"
                  value={quickNewCategory}
                  onChange={(e) => setQuickNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-sm focus:outline-none focus:border-indigo-600 font-semibold"
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-natural-border">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setShowQuickCategoryModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Create Category</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 8: ADJUST INVENTORY COUNT & LOG STOCK MOVEMENT */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 border border-natural-border shadow-elevated space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-natural-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-text">
                  Log Count & Stock Movement
                </h3>
                <p className="text-xs text-natural-muted">
                  Record current count or past counts (e.g. yesterday vs today)
                </p>
              </div>
              <button
                onClick={() => setAdjustingItem(null)}
                className="text-natural-muted hover:text-natural-text p-1.5 rounded-xl hover:bg-natural-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Item summary badge */}
            <div className="bg-natural-surface/70 rounded-2xl p-3 border border-natural-border flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-900 bg-indigo-100/80 px-2 py-0.5 rounded-md inline-block mb-1">
                  {adjustingItem.category}
                </span>
                <h4 className="font-serif text-base font-bold text-natural-text">
                  {adjustingItem.name}
                </h4>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold uppercase text-natural-muted block">
                  Current On-Hand
                </span>
                <span className="font-serif text-xl font-extrabold text-brand-950">
                  {adjustingItem.quantity} {adjustingItem.unit}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmAdjustCount} className="space-y-4">
              {/* New Quantity Input and Real-Time Diff */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  New Physical Count ({adjustingItem.unit}) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={adjustForm.quantity}
                    onChange={(e) =>
                      setAdjustForm({ ...adjustForm, quantity: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-300 bg-indigo-50/30 text-lg font-extrabold text-indigo-950 focus:outline-none focus:border-indigo-600"
                    autoFocus
                  />
                  <div className="shrink-0 text-center px-4 py-2 bg-natural-warmWhite rounded-2xl border border-natural-border">
                    <span className="text-[10px] font-bold uppercase text-natural-muted block">Difference</span>
                    <span
                      className={`text-sm font-extrabold ${
                        adjustForm.quantity - adjustingItem.quantity > 0
                          ? "text-emerald-700"
                          : adjustForm.quantity - adjustingItem.quantity < 0
                          ? "text-rose-700"
                          : "text-natural-muted"
                      }`}
                    >
                      {adjustForm.quantity - adjustingItem.quantity > 0
                        ? `+${adjustForm.quantity - adjustingItem.quantity}`
                        : adjustForm.quantity - adjustingItem.quantity}{" "}
                      {adjustingItem.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date of Record Selection: Today / Yesterday / Custom */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1.5">
                  When Was This Count Recorded? *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustForm({ ...adjustForm, dateChoice: "today" })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      adjustForm.dateChoice === "today"
                        ? "bg-indigo-900 text-white border-indigo-900 shadow-xs"
                        : "bg-white text-natural-text border-natural-border hover:bg-natural-surface"
                    }`}
                  >
                    Today
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustForm({ ...adjustForm, dateChoice: "yesterday" })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      adjustForm.dateChoice === "yesterday"
                        ? "bg-indigo-900 text-white border-indigo-900 shadow-xs"
                        : "bg-white text-natural-text border-natural-border hover:bg-natural-surface"
                    }`}
                  >
                    Yesterday
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustForm({ ...adjustForm, dateChoice: "custom" })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      adjustForm.dateChoice === "custom"
                        ? "bg-indigo-900 text-white border-indigo-900 shadow-xs"
                        : "bg-white text-natural-text border-natural-border hover:bg-natural-surface"
                    }`}
                  >
                    Specific Date
                  </button>
                </div>

                {adjustForm.dateChoice === "custom" && (
                  <div className="mt-2.5">
                    <input
                      type="date"
                      value={adjustForm.customDate}
                      onChange={(e) => setAdjustForm({ ...adjustForm, customDate: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600 font-semibold"
                    />
                  </div>
                )}
              </div>

              {/* Movement Reason */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Reason for Movement *
                </label>
                <Dropdown
                  value={adjustForm.change_type}
                  onChange={(val) => setAdjustForm({ ...adjustForm, change_type: val })}
                  options={[
                    { value: "restock", label: "Restock / Purchased (+ Inbound)", badge: "Inbound" },
                    { value: "usage", label: "Used / Consumed / Dispatched (- Outbound)", badge: "Outbound" },
                    { value: "audit", label: "Physical Stock Count / Audit (Recount)", badge: "Audit" },
                    { value: "damaged", label: "Damaged / Scrapped / Discarded (- Loss)", badge: "Loss" },
                    { value: "adjustment", label: "General Count Adjustment", badge: "Adjust" },
                  ]}
                  placeholder="Select movement reason"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block mb-1">
                  Notes / Explanation (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Received 10 new crates from local market, or recount after yesterday shift"
                  value={adjustForm.notes}
                  onChange={(e) => setAdjustForm({ ...adjustForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-natural-border">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setAdjustingItem(null)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isSubmittingAdjustment}
                  className="bg-indigo-700 hover:bg-indigo-800 text-white"
                >
                  {isSubmittingAdjustment ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Save & Record Movement</span>
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 9: ITEM STOCK MOVEMENT HISTORY TIMELINE */}
      {selectedItemForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 border border-natural-border shadow-elevated space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-natural-border pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-text">
                  Stock Movement History
                </h3>
                <p className="text-xs text-natural-muted">
                  Full chronological audit trail for this item
                </p>
              </div>
              <button
                onClick={() => setSelectedItemForHistory(null)}
                className="text-natural-muted hover:text-natural-text p-1.5 rounded-xl hover:bg-natural-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Item summary badge */}
            <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-900 bg-white px-2 py-0.5 rounded-md inline-block mb-1 border border-indigo-200">
                  {selectedItemForHistory.category}
                </span>
                <h4 className="font-serif text-base font-bold text-natural-text">
                  {selectedItemForHistory.name}
                </h4>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold uppercase text-natural-muted block">
                  Current Stock
                </span>
                <span className="font-serif text-2xl font-extrabold text-brand-950">
                  {selectedItemForHistory.quantity} {selectedItemForHistory.unit}
                </span>
              </div>
            </div>

            {/* Item Stock History Bar Graph */}
            <BarGraph
              title="Stock Movement History"
              subtitle={`Chronological stock levels for ${selectedItemForHistory.name}`}
              mode="timeline"
              hideModeToggle={true}
              data={
                itemHistoryList.length > 0
                  ? [...itemHistoryList].reverse().map((entry, idx) => ({
                      id: entry.id || `hist-${idx}`,
                      label: formatHistoryDate(entry.recorded_at),
                      currentValue: entry.new_quantity,
                      previousValue: entry.previous_quantity,
                      unit: entry.unit || selectedItemForHistory.unit,
                      notes:
                        entry.notes ||
                        `${entry.change_type.replace(/_/g, " ")} (${
                          entry.change_amount >= 0 ? `+${entry.change_amount}` : entry.change_amount
                        })`,
                    }))
                  : [
                      {
                        id: selectedItemForHistory.id,
                        label: "Current Count",
                        currentValue: selectedItemForHistory.quantity,
                        previousValue:
                          selectedItemForHistory.last_previous_quantity ?? selectedItemForHistory.quantity,
                        unit: selectedItemForHistory.unit,
                        notes: selectedItemForHistory.last_notes ?? "Current on-hand stock",
                      },
                    ]
              }
            />

            {/* Timeline content */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-natural-muted flex items-center justify-between">
                <span>Recorded Timeline</span>
                <span>{itemHistoryList.length} events logged</span>
              </h5>

              {loadingItemHistory ? (
                <div className="text-center py-8 text-natural-muted text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-700" />
                  <span>Loading movement history...</span>
                </div>
              ) : itemHistoryList.length === 0 ? (
                <div className="text-center py-8 bg-natural-surface/60 rounded-2xl border border-natural-border text-xs text-natural-muted space-y-1">
                  <p className="font-semibold text-natural-text">No recorded stock movements yet.</p>
                  <p>Use the &ldquo;Log Count / Adjust&rdquo; button to record a count change.</p>
                </div>
              ) : (
                <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                  {itemHistoryList.map((entry, idx) => {
                    const isPositive = entry.change_amount >= 0;
                    const isZero = entry.change_amount === 0;

                    return (
                      <div key={entry.id || idx} className="relative space-y-1.5">
                        {/* Timeline dot */}
                        <div
                          className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                            isPositive && !isZero
                              ? "bg-emerald-600"
                              : !isPositive
                              ? "bg-rose-600"
                              : "bg-indigo-600"
                          }`}
                        />

                        {/* Date and movement pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-natural-text">
                            {formatHistoryDate(entry.recorded_at)}
                          </span>

                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                              isPositive && !isZero
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : !isPositive
                                ? "bg-rose-50 text-rose-800 border-rose-200"
                                : "bg-gray-50 text-gray-800 border-gray-200"
                            }`}
                          >
                            {isPositive && !isZero ? `+${entry.change_amount}` : entry.change_amount}{" "}
                            {entry.unit}
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="bg-natural-warmWhite p-3 rounded-2xl border border-natural-border/80 space-y-1 text-xs">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-natural-muted font-medium">
                              From <strong className="text-natural-text">{entry.previous_quantity}</strong>
                            </span>
                            <span className="text-indigo-400 font-bold">➔</span>
                            <span className="text-brand-950 font-extrabold">
                              To <strong>{entry.new_quantity} {entry.unit}</strong>
                            </span>
                            <span className="text-[10px] uppercase font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded ml-2">
                              {entry.change_type.replace(/_/g, " ")}
                            </span>
                          </div>

                          {entry.notes && (
                            <p className="text-[11px] text-natural-muted/90 italic pt-1 border-t border-natural-border/50">
                              &ldquo;{entry.notes}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-natural-border">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setSelectedItemForHistory(null)}
              >
                Close
              </Button>

              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={() => {
                  const target = selectedItemForHistory;
                  setSelectedItemForHistory(null);
                  openAdjustModal(target);
                }}
                className="bg-indigo-700 hover:bg-indigo-800 text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Log New Count</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
