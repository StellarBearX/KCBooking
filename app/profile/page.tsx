"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Camera, Edit2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/contexts/UserContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage);

  // Update local state when user context changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setProfileImage(user.profileImage);
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({
      name,
      email,
      phone,
      profileImage,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setProfileImage(user.profileImage);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-6 max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-text">โปรไฟล์</h1>
          <p className="text-sm text-text-secondary">จัดการข้อมูลส่วนตัวของคุณ</p>
        </div>

        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform">
                    <Camera className="h-5 w-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name */}
              {isEditing ? (
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg font-semibold mb-2"
                  placeholder="ชื่อ-นามสกุล"
                />
              ) : (
                <h2 className="text-xl font-bold mb-2 text-text">{name}</h2>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">ข้อมูลส่วนตัว</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg text-primary active:bg-primary/10"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg text-green-600 active:bg-green-50"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-lg text-red-600 active:bg-red-50"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                  อีเมล
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="อีเมล"
                  />
                ) : (
                  <p className="text-text py-2 px-3 bg-background-light rounded-lg">
                    {email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                  เบอร์โทรศัพท์
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="เบอร์โทรศัพท์"
                  />
                ) : (
                  <p className="text-text py-2 px-3 bg-background-light rounded-lg">
                    {phone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/my-bookings")}
          >
            ดูการจองของฉัน
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/")}
          >
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </div>
  );
}

